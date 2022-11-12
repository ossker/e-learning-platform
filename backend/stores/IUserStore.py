from abc import abstractmethod, ABC
from typing import List

from entities import User


class IUserStore(ABC):
    @abstractmethod
    def add(self, user: User) -> None:
        pass

    @abstractmethod
    def add_many(self, user_list: List[User]) -> None:
        pass

    @abstractmethod
    def delete(self, user: User) -> None:
        pass

    @abstractmethod
    def delete_many(self, user_list: List[User]) -> None:
        pass

    @abstractmethod
    def find_by_enrolled_course(self, enrolled_course_id: int) -> List[User]:
        """
            user = User()
            course = Course()
            user.courses.append(course)
            user.course_associations.append(CourseEnrolledModel(course=course))

        """
        pass

    @abstractmethod
    def find_by_owning_course(self, owning_course_id: int) -> List[User]:
        pass

    @abstractmethod
    def find_all(self) -> List[User]:
        pass
