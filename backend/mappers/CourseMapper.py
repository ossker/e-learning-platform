from entities.Course import Course


def course_model_to_entity(course_model) -> Course:
    return Course(
        name=course_model.name,
        user=course_model.owner,
        description=course_model.description
    )
