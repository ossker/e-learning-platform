from typing import List

from exts import db
from models import CourseModel
from models.CategoryModel import CategoryModel


def add_category(category) -> None:
    db.session.add(category)
    db.session.commit()


def delete_category(category) -> None:
    db.session.delete(category)
    db.session.commit()


def find_category_by_id(category_id: int) -> CategoryModel:
    return CategoryModel.query.filter_by(id=category_id).first()


def find_category_by_course_id(course_id: int) -> CategoryModel:
    course = CourseModel.query.filter_by(id=course_id).first()
    return CategoryModel.query.filter_by(id=course.category_id).first()


def find_all_categories():
    category_models = CategoryModel.query.all()
    return category_models
