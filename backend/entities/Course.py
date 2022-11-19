from dataclasses import dataclass
from typing import Optional, List, Any
from entities.User import User


@dataclass
class Course:
    name: str
    description: Optional[str]
    owner: User
    tutorials: Optional[List]

    def __init__(
        self,
        name: str,
        owner: User,
        tutorials: Optional[List] = None,
        description: Optional[str] = None
    ):
        self.name = name
        self.description = description
        self.owner = owner
        self.tutorials = tutorials



