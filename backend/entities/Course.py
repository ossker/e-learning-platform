from dataclasses import dataclass
from typing import Optional, List, Any
from entities.User import User


@dataclass
class Course:
    name: str
    description: Optional[str]
    owner: User
    image: Optional[str]
    updated_date: str
    actual_price: Optional[float]
    discounted_price: Optional[float]
    is_free: bool
    language: str
    category: Any
    course_image: Optional[str]
    tutorials: Optional[List]

    def __init__(
        self,
        name: str,
        owner: User,
        updated_date: str,
        is_free: bool,
        language: str,
        category: Any,
        course_image: Optional[str] = None,
        actual_price: Optional[float] = None,
        discounted_price: Optional[float] = None,
        tutorials: Optional[List] = None,
        description: Optional[str] = None
    ):
        self.name = name
        self.owner = owner
        self.updated_date = updated_date
        self.is_free = is_free
        self.language = language
        self.actual_price = actual_price
        self.discounted_price = discounted_price
        self.tutorials = tutorials
        self.description = description
        self.course_image = course_image
        self.category = category



