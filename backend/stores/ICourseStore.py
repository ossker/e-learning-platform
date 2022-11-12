from abc import abstractmethod, ABC
from typing import List

from entities import Course


class ICourseStore(ABC):
    @abstractmethod
    def add(self, course: Course) -> None:
        pass

    @abstractmethod
    def add_many(self, course_list: List[Course]) -> None:
        pass

    @abstractmethod
    def delete(self, course: Course) -> None:
        pass

    @abstractmethod
    def delete_many(self, course_list: List[Course]) -> None:
        pass

    @abstractmethod
    def find_by_owner_id(self, owner_id: int) -> List[Course]:
        pass

    @abstractmethod
    def find_all(self) -> List[Course]:
        pass
