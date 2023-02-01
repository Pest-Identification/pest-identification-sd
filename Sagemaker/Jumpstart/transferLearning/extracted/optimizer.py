from argparse import Namespace

from constants import constants
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.optimizers import Adadelta
from tensorflow.keras.optimizers import Adagrad
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.optimizers import Optimizer
from tensorflow.keras.optimizers import RMSprop
from tensorflow.python.distribute.distribute_lib import Strategy


def set_optimizer(distributed_strategy: Strategy, args: Namespace) -> Optimizer:
    """Returns a TensorFlow optimizer configured by the argparse argument Namespace."""
    optimizer: str = getattr(args, "optimizer")
    learning_rate: float = getattr(args, "learning_rate")
    rho: float = getattr(args, "rho")
    epsilon: float = getattr(args, "epsilon")
    initial_accumulator_value: float = getattr(args, "initial_accumulator_value")
    beta_1: float = getattr(args, "beta_1")
    beta_2: float = getattr(args, "beta_2")
    momentum: float = getattr(args, "momentum")

    if optimizer == constants.ADADELTA:
        with distributed_strategy.scope():
            optimizer = Adadelta(
                learning_rate=learning_rate,
                rho=rho,
                epsilon=epsilon,
                name="Adadelta",
            )
    elif optimizer == constants.ADAGRAD:
        with distributed_strategy.scope():
            optimizer = Adagrad(
                learning_rate=learning_rate,
                initial_accumulator_value=initial_accumulator_value,
                epsilon=epsilon,
                name="Adagrad",
            )
    elif optimizer == constants.ADAM:
        with distributed_strategy.scope():
            optimizer = Adam(
                learning_rate=learning_rate,
                beta_1=beta_1,
                beta_2=beta_2,
                epsilon=epsilon,
                amsgrad=False,
                name="Adam",
            )
    elif optimizer == constants.SGD or optimizer == constants.NESTEROV:
        nesterov = True if optimizer == constants.NESTEROV else False
        with distributed_strategy.scope():
            optimizer = SGD(learning_rate=learning_rate, momentum=momentum, nesterov=nesterov, name="SGD")
    elif optimizer == constants.RMSPROP:
        with distributed_strategy.scope():
            optimizer = RMSprop(
                learning_rate=learning_rate,
                rho=rho,
                momentum=momentum,
                epsilon=epsilon,
                centered=False,
                name="RMSprop",
            )

    return optimizer
