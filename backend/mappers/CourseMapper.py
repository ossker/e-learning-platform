from entities.Course import Course
from models.CourseModel import CourseModel


def course_model_to_entity(course_model: CourseModel) -> Course:
    return Course(
        name=course_model.name,
        owner=course_model.owner,
        description=course_model.description
    )


def course_entity_to_model(course_entity: Course) -> CourseModel:
    return CourseModel(
        name=course_entity.name,
        description=course_entity.description,
        owner=course_entity.owner
    )
