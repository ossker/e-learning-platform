from entities.Course import Course
from stores_implementation.UserStore import find_user_by_id


def create_course(data: dict):
    name = data.get('name')
    description = data.get('description')
    owner_id = data.get('owner')
    owner = find_user_by_id(owner_id)
    if owner is not None:
        return Course(
            name=name,
            description=description,
            owner=owner.id
        )
    else:
        return None
