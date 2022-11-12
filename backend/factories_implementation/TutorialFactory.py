from entities import Tutorial
from factories import ITutorialFactory


class TutorialFactory(ITutorialFactory):
    def create_tutorial(self, data: dict) -> Tutorial:
        pass
