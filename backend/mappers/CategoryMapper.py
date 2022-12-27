from typing import List, Dict

from entities.Category import Category
from models.CategoryModel import CategoryModel
from stores_implementation.CourseStore import course_find_indexes_by_category_id


def category_entity_to_model(category_entity) -> CategoryModel:
    return CategoryModel(
        name=category_entity.name,
        image=category_entity.image
    )


def category_model_to_entity(category_model) -> Category:
    courses = course_find_indexes_by_category_id(category_model.id)
    return Category(
        name=category_model.name,
        image=category_model.image
    )


def category_model_to_dict(category_model: CategoryModel) -> Dict:
    return {
        "name": category_model.name,
        "courses": [
            {"course_id": course.id,
             "name": course.name,
             } for course in category_model.courses
        ]
    }
