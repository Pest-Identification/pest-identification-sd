import argparse
from enum import Enum
from typing import List
from typing import Optional
from typing import Union

from constants import constants


class PixelScalingMethod(str, Enum):
    """Specifies how to scale pixels during image pre-processing."""

    NORMALIZE = "normalize"
    CENTER = "center"
    STANDARDIZE_ON_IMAGENET = "standardize_on_imagenet"

    def scale(self) -> Union[float, List[float]]:
        """Obtain the scaling factor related to this object."""
        if self == PixelScalingMethod.NORMALIZE:
            return 1.0 / constants.MAX_PIXEL_VALUE
        elif self == PixelScalingMethod.CENTER:
            return 2.0 / constants.MAX_PIXEL_VALUE
        elif self == PixelScalingMethod.STANDARDIZE_ON_IMAGENET:
            return [1.0 / sigma for sigma in constants.IMAGENET_STD_DEV]
        else:
            raise NotImplementedError(f"Scale is not defined for {type(self)}.")

    def offset(self) -> Union[float, List[float]]:
        """Obtain the offset value related to this object."""
        if self == PixelScalingMethod.NORMALIZE:
            return 0.0
        elif self == PixelScalingMethod.CENTER:
            return -1.0
        elif self == PixelScalingMethod.STANDARDIZE_ON_IMAGENET:
            return [-mu / sigma for mu, sigma in zip(constants.IMAGENET_MEAN, constants.IMAGENET_STD_DEV)]
        else:
            raise NotImplementedError(f"Offset is not defined for {type(self)}.")


class ArtifactType(str, Enum):
    """Specifies which JumpStart script a model artifact is intended to be used for."""

    INFERENCE = "inference"
    TRAINING = "training"

    def is_trainable(self, signature: Optional[str] = None) -> bool:
        """Determine whether the trainable flag to a TF Hub KerasLayer should be set to True.

        This should occur for all TF2 models, but cannot be set for legacy TF1 Hub format or if signature is True.
        """
        if signature is not None:
            return False
        return self == ArtifactType.TRAINING

    def maybe_change_url_to_feature_vector_url(self, url: str, feature_vector_url: Optional[str] = None) -> str:
        """Manipulate the url to represent a training url if the artifact type is "training".

        The default model url is provided in metadata. For most models, replacing a common substring in the url results
        in the correct feature vector url. Some models require feature_vector_url to be specified in the metadata.
        """
        if self == ArtifactType.TRAINING:
            if feature_vector_url is not None:
                return feature_vector_url
            return url.replace(constants.URL_CLASSIFICATION_STR, constants.URL_FEATURE_VECTOR_STR)
        return url


class EnumAction(argparse.Action):
    """Argparse action for handling Enums to be used by the arparse library."""

    def __init__(self, **kwargs):
        """Initializer used by the argparse library.

        Ensure ArgumentParser.add_argument includes the enum object in the type field.
        """
        # Ensure an Enum subclass is provided
        enum_type = kwargs.pop("type", None)
        if enum_type is None:
            raise ValueError("Type must be assigned an Enum when using EnumAction.")
        if not issubclass(enum_type, Enum):
            raise TypeError("Type must be an Enum when using EnumAction.")

        # Generate choices from the Enum
        kwargs.setdefault("choices", tuple(e.value for e in enum_type))
        super().__init__(**kwargs)
        self._enum = enum_type

    def __call__(self, parser, namespace, values, option_string=None):
        """Handle casting argparse input to enum."""
        value = self._enum(values)
        setattr(namespace, self.dest, value)
