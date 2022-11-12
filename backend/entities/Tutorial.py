from dataclasses import dataclass
from typing import Optional


@dataclass
class Tutorial:
    title: str
    video: Optional[str]
    content: Optional[str]

    def __init__(
        self,
        title: str,
        video: Optional[str] = None,
        content: Optional[str] = None,

    ):
        self.title = title
        self.video = video
        self.content = content

