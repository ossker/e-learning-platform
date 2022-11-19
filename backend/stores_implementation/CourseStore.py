from typing import List

from models.CourseModel import CourseModel


def course_find_indexes_by_category_id(category_id: int) -> List:
    courses_models = CourseModel.query.filter_by(id=category_id).all()
    return [course.id for course in courses_models]
