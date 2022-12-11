from dataclasses import dataclass


@dataclass
class Category:
    name: str
    image: str

    def __init__(
        self,
        name: str,
        image: str
    ):
        self.name = name
        self.image = image
#
