from dataclasses import dataclass
from typing import Optional, List

from entities.Tutorial import Tutorial
from entities.User import User
from models import CourseModel
from stores_implementation import CourseStore


@dataclass
class Course:
    name: str
    description: Optional[str]
    owner: User
    tutorials: List[Tutorial]

    def __init__(
        self,
        name: str,
        user: User,
        tutorials: List[Tutorial],
        description: Optional[str] = None
    ):
        self.name = name
        self.description = description
        self.owner = user
        self.tutorials = tutorials

    def get_id(self) -> int:
        course_id = CourseStore.get_id_find_by_name(self.name)
        return course_id


