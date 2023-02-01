import logging
from argparse import Namespace
from timeit import default_timer as timer
from typing import Any
from typing import Dict
from typing import List
from typing import Optional

from constants import constants
from tensorflow.data import Dataset
from tensorflow.keras.callbacks import Callback
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.python.keras.utils.layer_utils import count_params


class ModelSelectionCallback(ModelCheckpoint):
    """Callback to set Keras model weights to the weights of the epoch that achieve the best monitored metric."""

    def __init__(self, checkpoint_folder: str, **kwargs: Any) -> None:
        """Initialization with passthrough to `ModelCheckpoint` superclass."""
        if kwargs.get("save_freq") != "epoch":
            raise ValueError(f"Save frequency {kwargs.get('save_freq')} must be `epoch` to support model selection.")
        self.checkpoint_folder = checkpoint_folder
        filepath = self.checkpoint_folder + "{epoch}"
        self.logs_best: Dict[str, Any] = {}
        self.epoch_best = 0
        super().__init__(filepath, **kwargs)

    def on_epoch_end(self, epoch: int, logs: Optional[Dict[str, Any]] = None) -> None:
        """At the end of each epoch, update the best metric and its respective epoch."""
        if logs is None:
            raise ValueError("Provided logs argument is of type NoneType. Cannot extract monitored metric.")

        metric_current = logs.get(self.monitor)
        metric_best = self.logs_best.get(self.monitor, self.best)
        if self.monitor_op(metric_current, metric_best):
            self.logs_best = logs
            self.epoch_best = epoch

        super().on_epoch_end(epoch, logs)

    def on_train_end(self, logs: Optional[Dict[str, Any]] = None) -> None:
        """Load model weights for the best epoch from checkpoint corresponding to that epoch."""
        epoch_best = self.epoch_best + 1
        epoch_current = self._current_epoch + 1
        # SageMaker automatic model tuning (AMT) parses the value of the self.monitor metric from log info
        logging.info(f"Setting weights to model with maximum {self.monitor} at epoch {epoch_best}/{epoch_current}:")
        for metric, value in self.logs_best.items():
            logging.info(f"- {metric}: {value}")
        self.model.load_weights(f"{self.checkpoint_folder}{epoch_best}")


class ModelPerformanceCallback(Callback):
    """Callback to log timing metrics and evaluation performance on a previously unseen test dataset, if provided."""

    def __init__(self, dataset_test: Optional[Dataset] = None) -> None:
        """Initialize callback with access to a test dataset."""
        super().__init__()
        self.dataset_test = dataset_test
        self.epoch_count = 0

    def on_train_begin(self, logs: Optional[Dict[str, Any]] = None) -> None:
        """Record model parameter counts and start a training timer at the beginning of training."""
        trainable_parameters_count = count_params(self.model.trainable_weights)
        non_trainable_parameters_count = count_params(self.model.non_trainable_weights)
        logging.info("Model information:")
        logging.info(f"- Number of trainable parameters: {trainable_parameters_count}")
        logging.info(f"- Number of non-trainable parameters: {non_trainable_parameters_count}")
        logging.info(f"- Number of parameters: {trainable_parameters_count + non_trainable_parameters_count}")

        self.time_train_begin = timer()

    def on_epoch_end(self, epoch: int, logs: Optional[Dict[str, Any]] = None) -> None:
        """Keep track of the number of epochs encountered, which may vary depending on early stopping criteria."""
        self.epoch_count = self.epoch_count + 1

    def on_train_end(self, logs: Optional[Dict[str, Any]] = None) -> None:
        """Log information about training time and evaluation on the test dataset."""
        train_duration = timer() - self.time_train_begin
        train_duration_per_epoch = train_duration / self.epoch_count
        logging.info("Training summary:")
        logging.info(f"- Total training duration: {train_duration} seconds")
        logging.info(f"- Average training duration per epoch: {train_duration_per_epoch} seconds")

        if self.dataset_test is not None:
            logging.info("Evaluating trained model on test dataset:")

            test_evaluation_start = timer()
            results = self.model.evaluate(self.dataset_test, return_dict=True, verbose=2)
            test_evaluation_duration = timer() - test_evaluation_start

            for metric, value in results.items():
                logging.info(f"- Test {metric}: {value}")

            test_size = self.dataset_test.cardinality().numpy()
            logging.info(f"- Test evaluation latency: {test_evaluation_duration} seconds")
            logging.info(f"- Average test latency per sample: {test_evaluation_duration / test_size} seconds")
            logging.info(f"- Average test throughput: {test_size / test_evaluation_duration} examples per second")
        else:
            logging.info("No test dataset available. Provide test dataset to compute test performance metrics.")


def callbacks_from_args(args: Namespace, eval_metric: str, dataset_test: Optional[Dataset] = None) -> List[Callback]:
    """Create a list of callbacks from an argparse parsed argument namespace."""
    checkpoint_save_best_only: str = getattr(args, "checkpoint_save_best_only")
    early_stopping_min_delta: float = getattr(args, "early_stopping_min_delta")
    early_stopping_patience: int = getattr(args, "early_stopping_patience")
    verbose_one_line_per_epoch: int = getattr(args, "verbose_one_line_per_epoch")
    early_stopping: str = getattr(args, "early_stopping")
    save_best_only = True if checkpoint_save_best_only == constants.TRUE_STR else False

    model_selection_callback = ModelSelectionCallback(
        checkpoint_folder=constants.CHECKPOINT_FOLDER,
        save_weights_only=constants.CHECKPOINT_SAVE_WEIGHTS_ONLY,
        monitor=eval_metric,
        mode=constants.CHECKPOINT_MODE,
        save_best_only=save_best_only,
        save_freq=constants.CHECKPOINT_SAVE_FREQ,
    )

    model_performance_callback = ModelPerformanceCallback(dataset_test=dataset_test)

    callbacks = [model_selection_callback, model_performance_callback]

    if early_stopping == constants.TRUE_STR:
        early_stopping_callback = EarlyStopping(
            monitor=eval_metric,
            min_delta=early_stopping_min_delta,
            patience=early_stopping_patience,
            verbose=verbose_one_line_per_epoch,
            mode=constants.EARLY_STOPPING_MODE,
            baseline=constants.EARLY_STOPPING_BASELINE,
            restore_best_weights=constants.EARLY_STOPPING_RESTORE_BEST_WEIGHTS,
        )
        callbacks.append(early_stopping_callback)

    return callbacks
