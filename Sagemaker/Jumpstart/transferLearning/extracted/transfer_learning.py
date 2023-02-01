"""transfer_learning_with_hub.ipynb

https://www.tensorflow.org/tutorials/images/transfer_learning_with_hub
https://www.tensorflow.org/hub/tutorials/tf2_image_retraining
https://www.tensorflow.org/tfx/tutorials/serving/rest_simple

For improving data loading:
https://www.tensorflow.org/tutorials/load_data/images
https://sagemaker.readthedocs.io/en/stable/frameworks/tensorflow/using_tf.html#training-with-pipe
-mode-using-pipemodedataset

https://aws.amazon.com/blogs/machine-learning/implement-checkpointing-with-tensorflow-for-amazon-sagemaker-managed-spot-training/
https://github.com/aws-samples/amazon-sagemaker-managed-spot-training/blob/main/tensorflow_managed_spot_training_checkpointing/source_dir/cifar10_keras_main.py
https://www.tensorflow.org/api_docs/python/tf/keras/callbacks/EarlyStopping
https://www.tensorflow.org/guide/keras/train_and_evaluate

For adding signatures to saved model
https://cloud.google.com/blog/topics/developers-practitioners/add-preprocessing-functions-tensorflow-models-and-deploy-vertex-ai
https://levelup.gitconnected.com/serving-an-image-classification-model-with-tensorflow-serving-c4657584d73d
"""

import logging
import sys
import tarfile
from argparse import Namespace
from pathlib import Path
from typing import List

import tensorflow as tf
from args import parse_args
from callbacks import callbacks_from_args
from constants import constants
from datasets import Datasets
from load_model import prepare_model
from model_info import ModelInfo
from optimizer import set_optimizer
from save_model import save_model_with_signature
from utils import save_label_info


root = logging.getLogger()
root.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stdout)
root.addHandler(handler)


def run_with_args(args: Namespace) -> None:
    """Run training."""
    pretrained_model: str = getattr(args, "pretrained_model")
    seed: int = getattr(args, "seed")
    batch_size: int = getattr(args, "batch_size")
    dropout_rate: float = getattr(args, "dropout_rate")
    regularizers_l2: float = getattr(args, "regularizers_l2")
    reinitialize_top_layer: str = getattr(args, "reinitialize_top_layer")
    train_only_top_layer: str = getattr(args, "train_only_top_layer")
    label_smoothing: float = getattr(args, "label_smoothing")
    eval_metric: str = getattr(args, "eval_metric")
    epochs: int = getattr(args, "epochs")
    verbose_one_line_per_epoch: int = getattr(args, "verbose_one_line_per_epoch")
    current_host: str = getattr(args, "current_host")
    hosts: List[str] = getattr(args, "hosts")
    model_dir: str = getattr(args, "model_dir")

    # find path of model .tar.gz file
    input_model_path = next(Path(pretrained_model).glob(constants.TAR_GZ_PATTERN))

    # extract model files
    input_model_untarred_path = Path(constants.INPUT_MODEL_UNTARRED_PATH)
    input_model_untarred_path.mkdir(parents=True, exist_ok=True)
    with tarfile.open(input_model_path, "r") as saved_model_tar:
        saved_model_tar.extractall(input_model_untarred_path)

    model_info = ModelInfo.from_file(input_model_untarred_path)
    logging.info(f"image size for this model is: {model_info.image_size}")

    tf.random.set_seed(seed)

    if len(tf.config.list_physical_devices("GPU")) > 1:
        # if the training instance has more than 1 gpu then this strategy enables data parallel training on multi-gpus.
        distributed_strategy = tf.distribute.MirroredStrategy()
        num_gpus = distributed_strategy.num_replicas_in_sync
        logging.info(
            f"Using tf.distribute.MirroredStrategy for distributed training on {num_gpus} "
            "GPUs available on this training instance."
        )
        logging.info(
            f"Note that the specified batch_size of {batch_size} is distributed across {num_gpus} "
            "GPUs on this training instance."
        )
    else:  # Use the Default Strategy which is a no-op strategy.
        distributed_strategy = tf.distribute.get_strategy()

    datasets = Datasets.from_args(args, model_info)

    model = prepare_model(
        distributed_strategy=distributed_strategy,
        model_info=model_info,
        num_labels=datasets.num_labels,
        dropout_rate=dropout_rate,
        regularizers_l2=regularizers_l2,
        reinitialize_top_layer=reinitialize_top_layer,
        train_only_top_layer=train_only_top_layer,
    )
    model.summary()
    with distributed_strategy.scope():
        metrics = [constants.ACCURACY]
        if datasets.num_labels == 1:
            metrics = metrics + [
                tf.keras.metrics.TruePositives(name=constants.TRUE_POS),
                tf.keras.metrics.FalsePositives(name=constants.FALSE_POS),
                tf.keras.metrics.TrueNegatives(name=constants.TRUE_NEG),
                tf.keras.metrics.FalseNegatives(name=constants.FALSE_NEG),
                tf.keras.metrics.Precision(name=constants.PRECISION),
                tf.keras.metrics.Recall(name=constants.RECALL),
                tf.keras.metrics.AUC(num_thresholds=constants.AUC_THRESHOLD, curve=constants.ROC, name=constants.AUC),
                tf.keras.metrics.AUC(num_thresholds=constants.AUC_THRESHOLD, curve=constants.PR, name=constants.PRC),
            ]
        if datasets.num_labels > constants.TOP_K_INT:
            metrics = metrics + [
                tf.keras.metrics.TopKCategoricalAccuracy(k=constants.TOP_K_INT, name=constants.TOP_K_ACCURACY),
            ]
        else:
            logging.info(
                f"Since there are {datasets.num_labels} <= {constants.TOP_K_INT} labels, the metric "
                f"{constants.TOP_K_ACCURACY} will not be computed."
            )
        model.compile(
            optimizer=set_optimizer(distributed_strategy, args),
            loss=tf.keras.losses.CategoricalCrossentropy(
                from_logits=constants.DEFAULT_FROM_LOGITS, label_smoothing=label_smoothing
            )
            if datasets.num_labels > 1
            else tf.keras.losses.BinaryCrossentropy(label_smoothing=label_smoothing),
            metrics=metrics,
        )
    if datasets.num_labels > 1:
        monitor = f"{constants.VAL}_{constants.ACCURACY}"
    else:
        monitor = f"{constants.VAL}_{eval_metric}"
    logging.info(f"Setting the evaluation metric to {monitor}")

    callbacks = callbacks_from_args(args, monitor, dataset_test=datasets.test)

    model.fit(
        datasets.train,
        epochs=epochs,
        validation_data=datasets.validation,
        verbose=verbose_one_line_per_epoch,
        callbacks=callbacks,
        shuffle=constants.FIT_SHUFFLE,
    )

    # Training can be run on multiple hosts, but we only want the first host (since there must be at least one host) to
    # serialize the model.
    if current_host == hosts[0]:
        export_path = model_dir / constants.VERSION
        logging.info(f"Saving the model with the highest {monitor} for running inference or incremental training.")
        save_model_with_signature(export_path, model, model_info, datasets.num_labels)
        # saving list of labels to model_dir
        save_label_info(datasets.class_names, model_dir=model_dir)
        model_info.save_finetuned(model_dir)


if __name__ == "__main__":
    args, unknown = parse_args()
    logging.info(f"Running training scripts with arguments: {args}")
    logging.info(f"Ignoring unrecognized arguments: {unknown}")
    run_with_args(args)
