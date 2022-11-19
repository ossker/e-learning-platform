from typing import List

from exts import db
from models.CourseModel import CourseModel


def course_find_indexes_by_category_id(category_id: int) -> List[CourseModel]:
    courses_models = CourseModel.query.filter_by(id=category_id).all()
    return [course.id for course in courses_models]


def find_all_courses() -> List[CourseModel]:
    courses_models = CourseModel.query.all()
    return courses_models


def find_course_by_id(course_id) -> CourseModel:
    course_model = CourseModel.query.filter_by(id=course_id).first()
    return course_model


def delete_course(course) -> None:
    db.session.delete(course)
    db.session.commit()


def add_course(course) -> None:
    db.session.add(course)
    db.session.commit()
