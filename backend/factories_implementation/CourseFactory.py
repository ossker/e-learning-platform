from entities import Course
from factories import ICourseFactory


class CourseFactory(ICourseFactory):
    def create_course(self, data: dict) -> Course:
        pass
