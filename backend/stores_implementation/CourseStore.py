from typing import List

from entities import Course
from mappers import CourseMapper
from models import CourseModel


class CourseStore:

    def add(self, course: Course) -> None:
        pass

    def delete(self, course: Course) -> None:
        pass

    def find_by_owner_id(self, owner_id: int):
        pass

    @staticmethod
    def find_by_id(id: int) -> Course:
        course_model = CourseModel.query.filter_by(id=id).first()
        return CourseMapper.model_to_entity(course_model) if course_model is not None else None

    @staticmethod
    def get_id_find_by_name(name: str) -> int:
        course_model = CourseModel.query.filter_by(name=name).first()
        return course_model.id

    def find_all(self):
        pass
