import json
from pathlib import Path

from constants import constants


def save_label_info(labels: list, model_dir: Path) -> None:
    """Save labels with the model."""

    with open(model_dir / constants.LABELS_INFO, "w") as f:
        f.write(json.dumps({constants.LABELS: labels}))
