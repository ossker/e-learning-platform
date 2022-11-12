from entities import CourseEnrolled
from models import CourseEnrolledModel


class CourseEnrolledMapper:

    def entity_to_model(self, course_enrolled_entity: CourseEnrolled) -> CourseEnrolledModel:
        pass

    def model_to_entity(self, course_enrolled_model: CourseEnrolledModel) -> CourseEnrolled:
        pass
