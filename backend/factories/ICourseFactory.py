from abc import abstractmethod, ABC

from entities import Course


class ICourseFactory(ABC):
    @abstractmethod
    def create_course(self, data: dict) -> Course:
        pass
