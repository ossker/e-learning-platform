from datetime import date

from flask_jwt_extended import get_jwt_identity

from entities.Course import Course
from stores_implementation.CategoryStore import find_category_by_id
from stores_implementation.UserStore import find_user_by_id, find_user_by_email


def create_course(data: dict):
    name = data.get('name')
    description = data.get('description')
    image = data.get('course_image')
    language = data.get('language')
    category_id = data.get('category')
    category = find_category_by_id(category_id)
    current_user_email = get_jwt_identity()
    owner = find_user_by_email(current_user_email)
    today = date.today()
    updated_date = today.strftime("%d/%m/%Y")
    if owner:
        return Course(
            name=name,
            owner=owner.id,
            is_free=True,
            language=language,
            description=description,
            updated_date=updated_date,
            course_image=image,
            category=category_id
        )
    else:
        return None
