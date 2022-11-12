from typing import List

from entities import Tutorial
from stores import ITutorialStore


class TutorialStore(ITutorialStore):
    def add(self, tutorial: Tutorial) -> None:
        pass

    def add_many(self, tutorial_list: List[Tutorial]) -> None:
        pass

    def delete(self, tutorial: Tutorial) -> None:
        pass

    def delete_many(self, tutorial_list: List[Tutorial]) -> None:
        pass

    def find_by_course_id(self, course_id: int) -> List[Tutorial]:
        pass

    def find_all(self) -> List[Tutorial]:
        pass
