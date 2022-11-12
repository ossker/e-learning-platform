from entities import CourseEnrolled
from factories import ICourseEnrolledFactory


class CourseEnrolledFactory(ICourseEnrolledFactory):
    def create_course_enrolled(self, data: dict) -> CourseEnrolled:
        pass
