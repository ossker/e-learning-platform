from dataclasses import dataclass
from typing import Any


@dataclass
class Topic:
    title: str
    course: Any

    def __init__(
            self,
            title: str,
            course: Any
    ):
        self.title = title
        self.course = course
