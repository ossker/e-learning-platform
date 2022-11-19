from dataclasses import dataclass
from typing import Optional, List

from entities.Course import Course


@dataclass
class Category:
    name: str
    courses: Optional[List[Course]]

    def __init__(
        self,
        name: str,
        courses: Optional[List[Course]] = None
    ):
        self.name = name
        self.courses = courses
#
