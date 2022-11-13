from dataclasses import dataclass
from typing import Optional, List

from entities import Course


@dataclass
class Tutorial:
    title: str
    video: Optional[str]
    content: Optional[str]
    course: Course

    def __init__(
        self,
        title: str,
        course: Course,
        video: Optional[str] = None,
        content: Optional[str] = None
    ):
        self.title = title
        self.video = video
        self.content = content
        self.course = course

