import json
import logging
from pathlib import Path
from typing import Any
from typing import Dict
from typing import List
from typing import Optional

from constants import constants
from enums import PixelScalingMethod


class ModelInfo:
    """A data class to store and serialize/deserialize model-specific information necessary for downstream scripts."""

    def __init__(
        self,
        image_size: Optional[List[Any]] = None,
        pixel_scaling_method: Optional[str] = None,
        finetuned: Optional[bool] = None,
        signature: Optional[str] = None,
        output_key: Optional[str] = None,
        **kwargs,
    ) -> None:
        """Initialize this ModelInfo object."""
        if image_size is None:
            logging.info(f"No {constants.IMAGE_SIZE} key provided, setting to {constants.DEFAULT_IMAGE_SIZE}.")
            image_size = constants.DEFAULT_IMAGE_SIZE
        if pixel_scaling_method is None:
            logging.info(f"No pixel_scaling_method key provided, setting to {PixelScalingMethod.NORMALIZE}.")
            pixel_scaling_method = PixelScalingMethod.NORMALIZE
        if finetuned is None:
            logging.info(f"No {constants.FINETUNED} key provided. Assuming model was not fine-tuned previously.")
            finetuned = False
        if len(kwargs) > 0:
            logging.warn(f"Constructing ModelInfo with unrecognized arguments, ignoring {kwargs}.")

        if type(image_size) != list or len(image_size) != 2:
            raise ValueError(f"Invalid {constants.IMAGE_SIZE}, {image_size}, must be a 2-dimensional list.")
        if type(finetuned) != bool:
            raise TypeError(f"Invalid {constants.FINETUNED}, {finetuned}, must be a bool.")
        pixel_scaling_method = PixelScalingMethod(pixel_scaling_method)

        self.image_size = [int(val) for val in image_size]
        self.pixel_scaling_method = pixel_scaling_method
        self.finetuned = finetuned
        self.signature = signature
        self.output_key = output_key

    @classmethod
    def from_file(cls, input_model_untarred_path: Path):
        """Get image size from model_info file in model tarball.

        Read the existing model_info file in input_model directory if exists, and then parse image_size from it if it
        exists else set it to the default value.
        Args:
            input_model_untarred_path: Input model is untarred into this directory.
        """
        input_model_info_file_path = input_model_untarred_path / constants.MODEL_INFO_FILE_NAME
        model_info_dict: Dict[str, Any]

        try:
            with open(input_model_info_file_path, "r") as f:
                model_info_dict = json.load(f)
        except FileNotFoundError:
            logging.info(
                f"Info file not found at '{input_model_info_file_path}'. "
                f"Setting {constants.IMAGE_SIZE} to be {constants.DEFAULT_IMAGE_SIZE}."
            )
            model_info_dict = {}
        except Exception as e:
            logging.error(
                f"Error parsing model_info file: {e}. please create a json file {input_model_info_file_path} with the "
                f"following objects: set {constants.FINETUNED} to True to continue finetuning on a previously "
                "finetuned model or False to start finetuning from the original pre-trained model; set "
                f"{constants.IMAGE_SIZE} to a 2 dimensional integer array representing the height and width of the "
                f"image; and set {constants.PIXEL_SCALING_METHOD} to the desired method of transforming pixel values "
                "during preprocessing prior to training and inference."
            )
            raise

        model_info_dict_lower = {k.lower(): v for k, v in model_info_dict.items()}
        return cls(**model_info_dict_lower)

    def save(self, model_dir: Path) -> None:
        """Save model info to the output directory."""
        output_model_info_file_path = model_dir / constants.MODEL_INFO_FILE_NAME
        with open(output_model_info_file_path, "w") as f:
            f.write(self._as_json())

    def save_finetuned(self, model_dir: Path) -> None:
        """Save model info to the output directory along with finetuned parameter set to True."""
        self.finetuned = True
        self.save(model_dir)

    def _as_dict(self):
        return {
            constants.IMAGE_SIZE: self.image_size,
            constants.PIXEL_SCALING_METHOD: self.pixel_scaling_method,
            constants.FINETUNED: self.finetuned,
            constants.SIGNATURE: self.signature,
            constants.OUTPUT_KEY: self.output_key,
        }

    def _as_json(self):
        return json.dumps(self._as_dict())
