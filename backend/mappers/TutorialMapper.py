from entities import Tutorial
from models import TutorialModel


class TutorialMapper:

    def entity_to_model(self, tutorial_entity: Tutorial) -> TutorialModel:
        pass

    def model_to_entity(self, tutorial_model: TutorialModel) -> Tutorial:
        pass
