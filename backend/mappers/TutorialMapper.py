from entities import Tutorial
from models import TutorialModel
from stores_implementation import CourseStore


class TutorialMapper:
    @staticmethod
    def entity_to_model(tutorial_entity: Tutorial) -> TutorialModel:
        return TutorialModel(
            title=tutorial_entity.title,
            video=tutorial_entity.video,
            content=tutorial_entity.content,
            course_id=tutorial_entity.course.get_id()
        )

    @staticmethod
    def model_to_entity(tutorial_model: TutorialModel) -> Tutorial:
        course = CourseStore.find_by_id(tutorial_model.course_id)
        return Tutorial(
            title=tutorial_model.title,
            course=course,
            video=tutorial_model.video,
            content=tutorial_model.content,
        )
