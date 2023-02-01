import logging
from pathlib import Path
from typing import Tuple
from typing import Union

import tensorflow as tf
import tensorflow_hub as hub
from constants import constants
from model_info import ModelInfo
from tensorflow.keras import layers
from tensorflow.python.keras.engine.keras_tensor import KerasTensor


def _set_trainable(model, train_only_top_layer: bool) -> None:
    """Set the trainable attribute for each layer based on train_only_top_layer.

    Parameters in the last layer are always trainable (trainable = True).
    For rest of the parameters, trainable = not train_only_top_layer.
    """
    if train_only_top_layer:
        logging.info("Setting model to train only top layer.")
    model.layers[-1]._trainable = True
    for layer in model.layers[:-1]:
        layer._trainable = not train_only_top_layer


def _model_from_feature_tensor(
    features: KerasTensor, input: KerasTensor, num_labels: int, dropout_rate: float, regularizers_l2: float
) -> tf.keras.Model:
    """Add a dropout layer and classification head to the feature tensor and create a Keras Model."""
    kernel_regularizer = tf.keras.regularizers.l2(regularizers_l2)
    activation = None if num_labels > 1 else constants.SIGMOID
    features_dropout = layers.Dropout(rate=dropout_rate)(features)
    output = layers.Dense(
        num_labels, name=constants.CLASSIFICATION_STR, activation=activation, kernel_regularizer=kernel_regularizer
    )(features_dropout)
    return tf.keras.Model(inputs=input, outputs=output)


def extract_only_feature_tensor(features: Union[KerasTensor, Tuple[KerasTensor]]) -> KerasTensor:
    """Obtain the feature tensor since some transformer-based models output a tuple including attention maps."""
    if isinstance(features, tuple):
        features = features[0]
    return features


def prepare_model(
    distributed_strategy: tf.distribute.Strategy,
    model_info: ModelInfo,
    num_labels: int,
    dropout_rate: float,
    regularizers_l2: float,
    reinitialize_top_layer: str,
    train_only_top_layer: str,
) -> tf.keras.Model:
    """Read the input model artifact, create, build and return the keras Sequential model."""
    saved_model_path = Path(constants.INPUT_MODEL_UNTARRED_PATH) / constants.VERSION
    input_shape = (None, *model_info.image_size, constants.COLOR_CHANNELS)

    is_finetuned = model_info.finetuned
    train_only_top_layer = True if train_only_top_layer == constants.TRUE_STR else False
    if reinitialize_top_layer == constants.AUTO_STR:
        reinitialize_top_layer = not is_finetuned
    elif reinitialize_top_layer == constants.TRUE_STR:
        reinitialize_top_layer = True
    else:
        reinitialize_top_layer = False

    if (is_finetuned, reinitialize_top_layer) == (False, False):
        raise ValueError(
            "The original pre-trained feature extraction model does not have a classification layer. Such a layer must "
            "be inserted for training to begin. Please set reinitialize_top_layer to 'True' and run training again."
        )

    elif (is_finetuned, reinitialize_top_layer) == (False, True):
        logging.info(
            "Loading the original pre-trained feature extraction model, and attaching a randomly initialized "
            f"classification layer to classify input images to one of the {num_labels} classes."
        )
        with distributed_strategy.scope():
            if model_info.signature is None:
                trainable = True
            else:
                logging.warn(
                    "Weights for this feature extraction model cannot be set. Setting hub.KerasLayer.trainable = True "
                    "is unsupported when calling a SavedModel signature."
                )
                trainable = False

            input = tf.keras.Input(shape=(*model_info.image_size, constants.COLOR_CHANNELS))
            features = hub.KerasLayer(
                str(saved_model_path),
                name=constants.FEATURES_STR,
                trainable=trainable,
                signature=model_info.signature,
                output_key=model_info.output_key,
            )(input)
            features = extract_only_feature_tensor(features)
            model = _model_from_feature_tensor(features, input, num_labels, dropout_rate, regularizers_l2)

    elif (is_finetuned, reinitialize_top_layer) == (True, False):
        logging.info(
            "Using the fine-tuned model specified by the SM_CHANNEL_MODEL environment variable as it is, including the "
            "top classification layer."
        )
        with distributed_strategy.scope():
            model = tf.keras.models.load_model(saved_model_path)

    elif (is_finetuned, reinitialize_top_layer) == (True, True):
        logging.info(
            "Loading the fine-tuned model specified by the SM_CHANNEL_MODEL environment variable, and replacing the "
            "classification layer with a randomly initialized classification layer to classify input images to one "
            f"of the {num_labels} classes."
        )
        with distributed_strategy.scope():
            saved_model = tf.keras.models.load_model(saved_model_path)
            features = saved_model.layers[-3].output  # extract the input to the previous Dropout layer
            features = extract_only_feature_tensor(features)
            model = _model_from_feature_tensor(features, saved_model.input, num_labels, dropout_rate, regularizers_l2)

    with distributed_strategy.scope():
        model.build(input_shape)
        _set_trainable(model, train_only_top_layer)

    return model
