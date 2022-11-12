from typing import List

from entities import Course
from stores import ICourseStore


class CourseStore(ICourseStore):
    def add(self, course: Course) -> None:
        pass

    def add_many(self, course_list: List[Course]) -> None:
        pass

    def delete(self, course: Course) -> None:
        pass

    def delete_many(self, course_list: List[Course]) -> None:
        pass

    def find_by_owner_id(self, owner_id: int) -> List[Course]:
        pass

    def find_all(self) -> List[Course]:
        pass
