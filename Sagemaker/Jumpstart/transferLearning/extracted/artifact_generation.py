import logging
import os
from argparse import ArgumentParser
from argparse import Namespace
from distutils.util import strtobool
from pathlib import Path
from typing import List
from typing import Tuple

import requests
import tensorflow as tf
import tensorflow_hub as hub
from constants import constants
from enums import ArtifactType
from enums import EnumAction
from enums import PixelScalingMethod
from load_model import extract_only_feature_tensor
from model_info import ModelInfo
from save_model import save_model_with_signature
from utils import save_label_info


def _parse_args() -> Tuple[Namespace, List[str]]:
    """Parse artifact generation hyperparameters."""
    parser = ArgumentParser()
    parser.add_argument("--artifact_type", type=ArtifactType, action=EnumAction, required=True)
    parser.add_argument("--model_name", type=str, required=True)
    parser.add_argument("--model-dir", type=Path, default=Path(os.environ.get("SM_MODEL_DIR")))
    parser.add_argument("--url", type=str, required=True)
    parser.add_argument("--image_size", type=int, nargs=2, default=constants.DEFAULT_IMAGE_SIZE)
    parser.add_argument(
        "--pixel_scaling_method",
        type=PixelScalingMethod,
        action=EnumAction,
        help="Specify how pixels are scaled during image pre-processing.",
    )

    # inference artifact arguments
    parser.add_argument("--labels_url", type=str, required=True)
    parser.add_argument(
        "--ignore_background_label",
        type=lambda x: bool(strtobool(x)),
        nargs="?",
        const=True,
        default=constants.DEFAULT_IGNORE_BACKGROUND_LABEL_BOOL,
    )

    # training artifact arguments
    parser.add_argument("--feature_vector_url", type=str)
    parser.add_argument("--signature", type=str, help="Specify module signature for Keras to use in KerasLayer.")
    parser.add_argument("--output_key", type=str, help="Name of the output item to return if the layer returns a dict.")

    return parser.parse_known_args()


def _read_class_labels(labels_url: str, ignore_background_label: bool) -> List[str]:
    """Read class information from a url specifying a text file.

    Some models ignore the 'background' label. This function removes the `background` label when ignore_background_label
    is True.

    Raises:
        ValueError: If the string 'background' is not the first class label when ignore_background_label is True.
    """
    class_labels = requests.get(labels_url).text.splitlines()

    if ignore_background_label is True:
        if class_labels[0] == constants.BACKGROUND_STR:
            class_labels.pop(0)
        else:
            raise ValueError(
                f"The first class label element is not {constants.BACKGROUND_STR}.  This is incompatible with the "
                f"provided argument to ignore the background label set to {ignore_background_label}."
            )

    return class_labels


def run_with_args(args: Namespace) -> None:
    """Generate the artifact."""
    export_path: Path = args.model_dir / constants.VERSION
    artifact_type: ArtifactType = args.artifact_type
    input_shape = (*args.image_size, constants.COLOR_CHANNELS)
    url = artifact_type.maybe_change_url_to_feature_vector_url(args.url, args.feature_vector_url)
    trainable = artifact_type.is_trainable(args.signature)

    model_info = ModelInfo(
        image_size=args.image_size,
        pixel_scaling_method=args.pixel_scaling_method,
        finetuned=False,
        signature=args.signature,
        output_key=args.output_key,
    )

    # Saving model artifacts is handled differently for inference and training
    if artifact_type == ArtifactType.TRAINING:
        # Some models require saving the original saved_model module rather than a built keras.Model. Therefore, some
        # information about loading the module must also be saved in ModelInfo.
        loaded_module = hub.load(url)
        if args.signature is None:
            signatures = None
        else:
            signatures = loaded_module.signatures
            if args.signature not in signatures:
                raise ValueError(f"Invalid signature {args.signature} provided, valid signatures include {signatures}.")
        tf.saved_model.save(loaded_module, export_path, signatures=signatures)
        model_info.save(args.model_dir)
    else:
        inputs = tf.keras.Input(shape=input_shape)
        features = hub.KerasLayer(url, trainable=trainable, signature=args.signature, output_key=args.output_key)(
            inputs
        )
        features = extract_only_feature_tensor(features)
        model = tf.keras.Model(inputs=inputs, outputs=features)

        logging.info(model.summary())

        labels = _read_class_labels(args.labels_url, args.ignore_background_label)
        num_labels = len(labels)

        num_labels_model = model.output_shape[1]
        if num_labels_model != num_labels:
            raise ValueError(f"Model has output dimension {num_labels_model}, expected {num_labels} labels.")

        save_model_with_signature(export_path, model, model_info, num_labels)
        save_label_info(labels, args.model_dir)


if __name__ == "__main__":
    args, unknown = _parse_args()
    logging.info(f"Running artifact generation script with arguments: {args}")
    logging.info(f"Ignoring unrecognized arguments: {unknown}")
    run_with_args(args)
