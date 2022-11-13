from typing import List

from entities import Category


class CategoryStore:
    def add(self, category: Category) -> None:
        pass

    def delete(self, category: Category) -> None:
        pass

    def find_by_course_id(self, course_id: int) -> List:
        pass

    def find_all(self):
        pass