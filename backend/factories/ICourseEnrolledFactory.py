from abc import abstractmethod, ABC

from entities import CourseEnrolled


class ICourseEnrolledFactory(ABC):
    @abstractmethod
    def create_course_enrolled(self, data: dict) -> CourseEnrolled:
        pass
