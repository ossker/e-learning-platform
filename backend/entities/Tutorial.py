from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Tutorial:
    title: str
    video: Optional[str]
    content: Optional[str]
    course: Any

    def __init__(
        self,
        title: str,
        course: Any,
        video: Optional[str] = None,
        content: Optional[str] = None
    ):
        self.title = title
        self.video = video
        self.content = content
        self.course = course

