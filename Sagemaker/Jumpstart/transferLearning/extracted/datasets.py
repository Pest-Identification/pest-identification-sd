import logging
from argparse import Namespace
from typing import Any
from typing import Dict
from typing import List
from typing import Optional
from typing import Tuple

from constants import constants
from enums import PixelScalingMethod
from model_info import ModelInfo
from tensorflow.data import AUTOTUNE
from tensorflow.data import Dataset
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Layer
from tensorflow.keras.layers import RandomFlip
from tensorflow.keras.layers import RandomRotation
from tensorflow.keras.layers import RandomZoom
from tensorflow.keras.layers import Rescaling
from tensorflow.keras.utils import image_dataset_from_directory


class Datasets:
    """Dataclass holding train, validation, and test datasets."""

    def __init__(
        self,
        train: Dataset,
        validation: Dataset,
        test: Optional[Dataset],
        class_names: List[str],
        label_mode: str,
    ) -> None:
        """Initialize datasets."""
        self.train = train
        self.validation = validation
        self.test = test
        self.class_names = class_names
        self.label_mode = label_mode

    @classmethod
    def from_args(cls, args: Namespace, model_info: ModelInfo) -> "Datasets":
        """Return the train and validation image datasets tuple.

        Note that train data iterator is set to shuffle=True, whereas validation data iterator is set to shuffle=False.
        Shuffling of training data helps improve accuracy, as the model sees training data in different
        epochs in different order, the mini-batches are different, and hence it avoids over-fitting.
        """
        data_dir_train: str = getattr(args, "train")
        data_dir_validation: Optional[str] = getattr(args, "validation", None)
        data_dir_test: Optional[str] = getattr(args, "test", None)
        binary_mode: Optional[str] = getattr(args, "binary_mode", None)
        label_mode = constants.BINARY_MODE if binary_mode == constants.TRUE_STR else constants.CATEGORICAL_MODE
        validation_split_ratio: float = getattr(args, "validation_split_ratio")
        batch_size: int = getattr(args, "batch_size")
        interpolation: str = getattr(args, "image_resize_interpolation")
        augmentation: bool = True if getattr(args, "augmentation") == constants.TRUE_STR else False
        random_flip: str = getattr(args, "augmentation_random_flip")
        random_zoom: float = getattr(args, "augmentation_random_zoom")
        random_rotation: float = getattr(args, "augmentation_random_rotation")
        random_seed: int = getattr(args, "random_seed")

        logging.info(f"Creating datasets using {label_mode} mode for label encodings.")
        logging.info(f"Images for this model will be resized to image size: {model_info.image_size}")

        dataset_kwargs = dict(
            labels=constants.LABELS_INFERRED,
            label_mode=label_mode,
            image_size=model_info.image_size,
            batch_size=None,
            interpolation=interpolation,
        )
        dataset_train_kwargs = dict(**dataset_kwargs, shuffle=True, seed=random_seed)
        dataset_not_train_kwargs = dict(**dataset_kwargs, shuffle=False)

        dataset_train = image_dataset_from_directory(data_dir_train, **dataset_train_kwargs)
        class_names = dataset_train.class_names
        dataset_train, dataset_validation = cls._create_dataset_validation(
            data_dir_validation, dataset_train, validation_split_ratio, **dataset_not_train_kwargs
        )
        dataset_test = cls._create_dataset_test(data_dir_test, **dataset_not_train_kwargs)

        logging.info(f"Class index to class name mapping: {dict(enumerate(class_names))}")

        augmentation_layers = cls._create_augmentation_layers(augmentation, random_flip, random_rotation, random_zoom)
        dataset_train = cls._prepare_dataset(
            dataset_train, "train", batch_size, model_info.pixel_scaling_method, class_names, augmentation_layers
        )
        dataset_validation = cls._prepare_dataset(
            dataset_validation, "validation", batch_size, model_info.pixel_scaling_method, class_names, None
        )
        if dataset_test is not None:
            dataset_test = cls._prepare_dataset(
                dataset_test, "test", batch_size, model_info.pixel_scaling_method, class_names, None
            )

        return cls(dataset_train, dataset_validation, dataset_test, class_names, label_mode)

    @property
    def num_labels(self) -> int:
        """Property to obtain the number of labels in the dataset from label_mode and class_names."""
        if self.label_mode == constants.BINARY_MODE:
            return 1
        else:
            return len(self.class_names)

    @staticmethod
    def _create_dataset_test(data_dir_test: Optional[str], **kwargs: Dict[str, Any]) -> Dataset:
        if data_dir_test is None:
            logging.info("No Test channel provided. Performance evaluations on test dataset will be skipped.")
            dataset_test = None
        else:
            logging.info("Loading test data from the Test channel.")
            dataset_test = image_dataset_from_directory(data_dir_test, **kwargs)
        return dataset_test

    @staticmethod
    def _create_dataset_validation(
        data_dir_validation: Optional[str],
        dataset_train: Dataset,
        validation_split_ratio: float,
        **kwargs: Dict[str, Any],
    ) -> Tuple[Dataset, Dataset]:
        if data_dir_validation is None:
            val_size = int(dataset_train.cardinality().numpy() * validation_split_ratio)
            train_size = dataset_train.cardinality() - val_size
            dataset_validation = dataset_train.take(val_size)
            dataset_train = dataset_train.skip(val_size).take(train_size)
        else:
            logging.info("Loading validation data from the Validation channel. Not splitting train dataset.")
            dataset_validation = image_dataset_from_directory(data_dir_validation, **kwargs)
        return dataset_train, dataset_validation

    @staticmethod
    def _prepare_dataset(
        dataset: Dataset,
        description: str,
        batch_size: int,
        pixel_scaling_method: PixelScalingMethod,
        class_names: List[str],
        augmentation_layers: Optional[List[Layer]],
    ) -> Dataset:
        class_dist = [0] * len(class_names)
        for _, label in dataset:
            class_dist += label.numpy().astype(int)
        logging.info(f"Cardinality of {description} dataset: {dataset.cardinality()}")
        logging.info(f"Number of class examples in {description} dataset: {dict(zip(class_names, class_dist))}")

        preprocessing = Rescaling(scale=pixel_scaling_method.scale(), offset=pixel_scaling_method.offset())
        if augmentation_layers is not None and len(augmentation_layers) > 0:
            preprocessing = Sequential([preprocessing] + augmentation_layers)

        dataset = dataset.batch(batch_size)
        dataset = dataset.map(lambda x, y: (preprocessing(x), y))
        dataset = dataset.prefetch(buffer_size=AUTOTUNE)

        return dataset

    @staticmethod
    def _create_augmentation_layers(
        augmentation: bool, random_flip: str, random_zoom: float, random_rotation: float
    ) -> Optional[List[Layer]]:
        if augmentation is False:
            return None
        augmentation_layers = []
        if random_flip != constants.NO_RANDOM_FLIP:
            augmentation_layers.append(RandomFlip(random_flip))
        if random_rotation != constants.NO_RANDOM_ROTATION:
            augmentation_layers.append(RandomRotation(random_rotation))
        if random_zoom != constants.NO_RANDOM_ZOOM:
            augmentation_layers.append(RandomZoom(random_zoom))
        if len(augmentation_layers) > 0:
            return augmentation_layers
        else:
            logging.warning(
                "`augmentation` is set to `True` but `random_flip`, `random_rotation`, and `random_zoom` all "
                "are set to None/zero. So, no data augmentation is applied."
            )
            return None
