import argparse
import json
import os
from pathlib import Path

from constants import constants


def parse_args():
    """Obtain parsed arguments for transfer_learning script."""

    parser = argparse.ArgumentParser()

    # Data, model, and output directories
    # While model_dir is always passed in from SageMaker, it requires model_dir to be set as a default hyperparameter.
    # If model_dir is not a default hyperparameter, then NoneType prefixes the model_dir passed in from SageMaker.
    # This affects Sagemaker automatic model tuning (AMT) jobs.  Therefore, model-dir is used in place of model_dir.
    parser.add_argument("--model-dir", type=Path, default=Path(os.environ.get("SM_MODEL_DIR")))
    parser.add_argument("--train", type=str, default=os.environ.get("SM_CHANNEL_TRAINING"))
    parser.add_argument("--validation", type=str, default=os.environ.get("SM_CHANNEL_VALIDATION"))
    parser.add_argument("--test", type=str, default=os.environ.get("SM_CHANNEL_TEST"))
    parser.add_argument("--pretrained_model", type=str, default=os.environ.get("SM_CHANNEL_MODEL"))
    parser.add_argument("--hosts", type=list, default=json.loads(os.environ.get("SM_HOSTS")))
    parser.add_argument("--current_host", type=str, default=os.environ.get("SM_CURRENT_HOST"))
    parser.add_argument("--verbose_one_line_per_epoch", type=int, default=constants.DEFAULT_VERBOSE_ONE_LINE_PER_EPOCH)
    parser.add_argument(
        "--checkpoint_save_best_only",
        default=constants.DEFAULT_CHECKPOINT_SAVE_BEST_ONLY,
        choices=(constants.TRUE_STR, constants.FALSE_STR),
    )
    parser.add_argument("--seed", type=int, default=constants.DEFAULT_SEED)
    parser.add_argument(
        "--reinitialize_top_layer",
        choices=(constants.TRUE_STR, constants.FALSE_STR, constants.AUTO_STR),
        default=constants.DEFAULT_REINITIALIZE_TOP_LAYER,
    )
    parser.add_argument(
        "--train_only_top_layer",
        choices=(constants.TRUE_STR, constants.FALSE_STR),
        default=constants.DEFAULT_TRAIN_ONLY_TOP_LAYER,
    )
    parser.add_argument("--validation-split-ratio", type=float, default=constants.DEFAULT_VALIDATION_SPLIT_RATIO)
    parser.add_argument(
        "--early_stopping",
        default=constants.DEFAULT_EARLY_STOPPING,
        choices=(constants.TRUE_STR, constants.FALSE_STR),
        help="True to use early stopping logic during training. False not to use it.",
    )
    parser.add_argument(
        "--early_stopping_patience",
        default=constants.DEFAULT_EARLY_STOPPING_PATIENCE,
        type=int,
        help="Number of epochs with no improvement after which training will be stopped."
        " It is used only when early_stopping = True.",
    )
    parser.add_argument(
        "--early_stopping_min_delta",
        default=constants.DEFAULT_EARLY_STOPPING_MIN_DELTA,
        type=float,
        help="Minimum change in the monitored quantity to qualify as an improvement, i.e. an absolute change of less "
        "than min_delta, will count as no improvement. It is used only when early_stopping = True.",
    )
    parser.add_argument(
        "--dropout_rate",
        type=float,
        default=constants.DEFAULT_DROPOUT_RATE,
        help="dropout-rate for the Dropout layer in the Classification layer",
    )
    parser.add_argument(
        "--regularizers_l2",
        type=float,
        default=constants.DEFAULT_REGULARIZERS_L2,
        help="L2 regularization factor for training loss",
    )
    parser.add_argument(
        "--label_smoothing",
        type=float,
        default=constants.DEFAULT_LABEL_SMOOTHING,
        help="Float in [0, 1]. When > 0, label values are smoothed, meaning the confidence on label "
        "values are relaxed. For example, if 0.1, use 0.1 / num_classes for non-target labels "
        "and 0.9 + 0.1 / num_classes for target labels.",
    )
    parser.add_argument(
        "--image_resize_interpolation",
        type=str,
        default=constants.DEFAULT_IMAGE_RESIZE_INTERPOLATION,
        choices=(
            constants.BILINEAR,
            constants.NEAREST,
            constants.BICUBIC,
            constants.AREA,
            constants.LANCZOS3,
            constants.LANCZOS5,
            constants.GAUSSIAN,
            constants.MITCHELLCUBIC,
        ),
        help="The interpolation method used when resizing images.",
    )
    parser.add_argument(
        "--augmentation",
        default=constants.DEFAULT_AUGMENTATION,
        choices=(constants.TRUE_STR, constants.FALSE_STR),
        help="If augmentation is True then random_flip, random_rotation, and random_zoom is applied on training data.",
    )
    parser.add_argument(
        "--augmentation_random_flip",
        type=str,
        default=constants.DEFAULT_AUGMENTATION_RANDOM_FLIP,
        choices=(constants.NO_RANDOM_FLIP, constants.HORIZONTAL, constants.VERTICAL, constants.HORIZONTAL_AND_VERTICAL),
    )
    parser.add_argument(
        "--augmentation_random_rotation",
        type=float,
        default=constants.DEFAULT_AUGMENTATION_RANDOM_ROTATION,
        help="A float represented as fraction of 2 Pi, representing lower and upper bound for rotating clockwise and "
        "counter-clockwise. A positive values means rotating counter clock-wise, while a negative value means "
        "clock-wise. 0 means no random rotation.",
    )
    parser.add_argument(
        "--augmentation_random_zoom",
        type=float,
        default=constants.DEFAULT_AUGMENTATION_RANDOM_ZOOM,
        help="A float represented as fraction of value, representing lower and upper bound for zooming vertically. "
        "A positive value means zooming out, while a negative value means zooming in. 0 mean no random zoom.",
    )
    parser.add_argument("--epochs", type=int, default=constants.DEFAULT_EPOCHS)
    parser.add_argument("--batch_size", type=int, default=constants.DEFAULT_BATCH_SIZE)
    parser.add_argument(
        "--optimizer",
        choices=(
            constants.ADAM,
            constants.SGD,
            constants.NESTEROV,
            constants.RMSPROP,
            constants.ADAGRAD,
            constants.ADADELTA,
        ),
        default=constants.DEFAULT_OPTIMIZER,
        help="Choose a TensorFlow optimizer",
    )
    parser.add_argument("--learning_rate", type=float, default=constants.DEFAULT_LEARNING_RATE)
    parser.add_argument(
        "--beta_1",
        type=float,
        default=constants.DEFAULT_BETA_1,
        help="The beta1 for adam, that is the exponential decay rate for the first moment estimates.",
    )
    parser.add_argument(
        "--beta_2",
        type=float,
        default=constants.DEFAULT_BETA_2,
        help="The beta2 for adam, that is the exponential decay rate for the second moment estimates.",
    )
    parser.add_argument(
        "--epsilon",
        type=float,
        default=constants.DEFAULT_EPSILON,
        help="The epsilon for adam, rmsprop, adadelta and adagrad."
        "It is usually set to a small value to avoid division by 0.",
    )
    parser.add_argument(
        "--momentum",
        type=float,
        default=constants.DEFAULT_MOMENTUM,
        help="The momentum for sgd and nag, ignored for other optimizers.",
    )
    parser.add_argument(
        "--rho",
        type=float,
        default=constants.DEFAULT_RHO,
        help="Discounting factor for the history/coming gradient, for adadelta and rmsprop. Ignore for others.",
    )
    parser.add_argument(
        "--initial_accumulator_value",
        type=float,
        default=constants.DEFAULT_INITIAL_ACCUMULATOR_VALUE,
        help="Starting value for the accumulators (per-parameter momentum values), for adagrad. Must be non-negative.",
    )
    parser.add_argument(
        "--binary_mode",
        choices=(constants.TRUE_STR, constants.FALSE_STR),
        default=constants.DEFAULT_BINARY_MODE,
        help="If it is a binary classification problem, binary-mode can be set to True. By default it is set to False. "
        "When it is true, the model returns a single probability number for the positive class, "
        "and the eval_metric can be set to precision, recall, AUC, or PRC.",
    )
    parser.add_argument(
        "--eval_metric",
        default=constants.ACCURACY,
        choices=(constants.ACCURACY, constants.PRECISION, constants.RECALL, constants.AUC, constants.PRC),
    )
    parser.add_argument(
        "--random_seed",
        type=int,
        default=constants.TRAIN_DATA_SHUFFLE_SEED,
        help="The seed used for training dataset shuffling and transformations.",
    )
    return parser.parse_known_args()
