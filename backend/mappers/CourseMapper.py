from entities import Course
from models import CourseModel


class CourseMapper:

    def entity_to_model(self, course_entity: Course) -> CourseModel:
        pass

    def model_to_entity(self, course_model: CourseModel) -> Course:
        pass
