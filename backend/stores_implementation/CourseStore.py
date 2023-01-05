from datetime import date
from typing import List

from flask_jwt_extended import get_jwt_identity

from exts import db
from models.CourseModel import CourseModel
from stores_implementation.UserStore import find_user_by_email, find_user_by_id


def course_find_indexes_by_category_id(category_id: int) -> List[CourseModel]:
    courses_models = CourseModel.query.filter_by(id=category_id).all()
    return [course.id for course in courses_models]


def find_all_courses() -> List[CourseModel]:
    courses_models = CourseModel.query.all()
    return courses_models


def find_courses_by_logged_user() -> List[CourseModel]:
    current_user_email = get_jwt_identity()
    owner = find_user_by_email(current_user_email)
    course_models = CourseModel.query.filter_by(owner=owner.id).all()
    return course_models


def find_courses_by_owner_id(owner_id) -> List[CourseModel]:
    owner = find_user_by_id(owner_id)
    course_models = CourseModel.query.filter_by(owner=owner.id).all()
    return course_models


def find_course_by_id(course_id) -> CourseModel:
    course_model = CourseModel.query.filter_by(id=course_id).first()
    return course_model


def find_course_by_name(course_name) -> CourseModel:
    course_model = CourseModel.query.filter_by(name=course_name).first()
    return course_model


def delete_course(course) -> None:
    db.session.delete(course)
    db.session.commit()


def update_course(course: CourseModel, data) -> dict:
    new_name = data.get('name')
    existing_course = find_course_by_name(new_name)
    if existing_course and existing_course.name != course.name:
        return {"status": 0}  # name taken
    course.name = new_name
    course.description = data.get('description')
    course.category_id = data.get('category')
    course.updated_date = date.today().strftime("%d/%m/%Y")
    db.session.commit()
    return {"status": 1}


def add_course(course) -> None:
    db.session.add(course)
    db.session.commit()
