from abc import abstractmethod, ABC
from typing import List

from entities import Category


class ICategoryStore(ABC):
    @abstractmethod
    def add(self, category: Category) -> None:
        pass

    @abstractmethod
    def add_many(self, category_list: List[Category]) -> None:
        pass

    @abstractmethod
    def delete(self, category: Category) -> None:
        pass

    @abstractmethod
    def delete_many(self, category_list: List[Category]) -> None:
        pass

    @abstractmethod
    def find_by_course_id(self, course_id: int) -> List[Category]:
        """
            category = Category()
            course = Course()
            category.courses.append(course)
        """
        pass

    @abstractmethod
    def find_all(self) -> List[Category]:
        pass
