from entities.Tutorial import Tutorial
from models.TutorialModel import TutorialModel


def tutorial_entity_to_model(tutorial_entity: Tutorial) -> TutorialModel:
    return TutorialModel(
        title=tutorial_entity.title,
        video=tutorial_entity.video,
        course_id=tutorial_entity.course
    )


def tutorial_model_to_entity(tutorial_model: TutorialModel) -> Tutorial:
    pass
