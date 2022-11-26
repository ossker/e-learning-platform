from flask_jwt_extended import get_jwt_identity

from entities.Course import Course
from stores_implementation.UserStore import find_user_by_id, find_user_by_email


def create_course(data: dict):
    name = data.get('name')
    description = data.get('description')
    current_user_email = get_jwt_identity()
    owner = find_user_by_email(current_user_email)
    if owner is not None:
        return Course(
            name=name,
            description=description,
            owner=owner.id
        )
    else:
        return None
