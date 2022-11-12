from typing import List

from entities import Category
from stores import ICategoryStore


class CategoryStore(ICategoryStore):
    def add(self, category: Category) -> None:
        pass

    def add_many(self, category_list: List[Category]) -> None:
        pass

    def delete(self, category: Category) -> None:
        pass

    def delete_many(self, category_list: List[Category]) -> None:
        pass

    def find_by_course_id(self, course_id: int) -> List[Category]:
        pass

    def find_all(self) -> List[Category]:
        pass