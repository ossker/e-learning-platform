from entities import Course
from models import CourseModel
from stores_implementation import TutorialStore


class CourseMapper:
    @staticmethod
    def entity_to_model(course_entity: Course) -> CourseModel:
        pass

    @staticmethod
    def model_to_entity(course_model: CourseModel) -> Course:
        tutorials = TutorialStore.find_by_course_id(course_model.id)
        return Course(
            name=course_model.name,
            user=course_model.owner,
            tutorials=tutorials,
            description=course_model.description
        )
