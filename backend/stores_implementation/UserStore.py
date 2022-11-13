from typing import List

from entities import User


class UserStore:
    def add(self, user: User) -> None:
        pass

    def delete(self, user: User) -> None:
        pass

    def find_by_enrolled_course(self, enrolled_course_id: int):
        pass

    def find_by_owning_course(self, owning_course_id: int):
        pass

    def find_all(self):
        pass
