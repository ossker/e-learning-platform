from abc import abstractmethod, ABC
from typing import List

from entities import Tutorial


class ITutorialStore(ABC):
    @abstractmethod
    def add(self, tutorial: Tutorial) -> None:
        pass

    @abstractmethod
    def add_many(self, tutorial_list: List[Tutorial]) -> None:
        pass

    @abstractmethod
    def delete(self, tutorial: Tutorial) -> None:
        pass

    @abstractmethod
    def delete_many(self, tutorial_list: List[Tutorial]) -> None:
        pass

    @abstractmethod
    def find_by_course_id(self, course_id: int) -> List[Tutorial]:
        pass

    @abstractmethod
    def find_all(self) -> List[Tutorial]:
        pass
