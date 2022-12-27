from entities.CourseEnrolled import CourseEnrolled
from models.CourseEnrolledModel import CourseEnrolledModel


def course_enrolled_entity_to_model(course_enrolled_entity: CourseEnrolled) -> CourseEnrolledModel:
    return CourseEnrolledModel(
        student_id=course_enrolled_entity.student,
        course_id=course_enrolled_entity.course,
        is_finished=course_enrolled_entity.is_finished
    )


def course_enrolled_model_to_entity(course_enrolled_model: CourseEnrolledModel) -> CourseEnrolled:
    pass
