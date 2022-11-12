from dataclasses import dataclass
from typing import Optional, List

from entities.Tutorial import Tutorial
from entities.User import User


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
