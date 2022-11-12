from typing import List

from entities import User
from stores import IUserStore


class UserStore(IUserStore):
    def add(self, user: User) -> None:
        pass

    def add_many(self, user_list: List[User]) -> None:
        pass

    def delete(self, user: User) -> None:
        pass

    def delete_many(self, user_list: List[User]) -> None:
        pass

    def find_by_enrolled_course(self, enrolled_course_id: int) -> List[User]:
        pass

    def find_by_owning_course(self, owning_course_id: int) -> List[User]:
        pass

    def find_all(self) -> List[User]:
        pass
