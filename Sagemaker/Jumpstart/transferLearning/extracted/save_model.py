from pathlib import Path

import tensorflow as tf
from model_info import ModelInfo


def save_model_with_signature(export_path: Path, model: tf.keras.Model, model_info: ModelInfo, num_labels: int) -> None:
    """Model is saved with a default serving signature that adds pre-processing and post-processing.

    pre-processing: The model takes in a raw image converted into bytearray. The pre-processing step performs the
    following: (a) resizes input image using the default 'bilinear' method as per the default image_size of the model
    which it was pre-trained as listed on tensorflow hub page of the model, (b) then casts it to float32, and
    (c) scales image entry-wise from pixel values [0, 255] as specified by the provided `PixelScalingMethod`.

    post-processing: The model outputs logits for each of the classes. The post-processing step performs the following:
    (a) using softmax layer converts logits into probabilities.

    Args:
        export_path: the local path where the model is to be saved.
        model: the trained model to be saved.
        model_info: a `ModelInfo` object containing information about the model_size and pixel_scaling_method used in
            the default serving signature.
        num_labels: if num_labels == 1, then model returns probability for the positive class and
            the output does not need post-processing.
    """

    def _preprocess(bytes_inputs):
        decoded = tf.io.decode_jpeg(bytes_inputs, channels=3)
        resized = tf.image.resize(decoded, size=model_info.image_size)
        cast_image = tf.cast(resized, dtype=tf.float32)
        scale_value = tf.constant(model_info.pixel_scaling_method.scale(), dtype=tf.float32)
        offset_value = tf.constant(model_info.pixel_scaling_method.offset(), dtype=tf.float32)
        scaled_image = tf.math.multiply(cast_image, scale_value)
        preprocessed_image = tf.math.add(scaled_image, offset_value)
        return preprocessed_image

    def _postprocess(logits):
        return tf.nn.softmax(logits, axis=None, name=None)

    def _get_serve_image_fn(model):
        @tf.function(input_signature=[tf.TensorSpec([None], tf.string)])
        def serve_image_fn(bytes_inputs):
            decoded_images = tf.map_fn(_preprocess, bytes_inputs, dtype=tf.float32)
            prediction = model(decoded_images)
            if num_labels == 1:
                return prediction
            else:
                probs = tf.map_fn(_postprocess, prediction)
                return probs

        return serve_image_fn

    signatures = {
        "serving_default": _get_serve_image_fn(model).get_concrete_function(
            tf.TensorSpec(shape=[None], dtype=tf.string)
        )
    }
    model.save(
        export_path,
        overwrite=True,
        include_optimizer=False,
        save_format=None,
        signatures=signatures,
        options=None,
    )
