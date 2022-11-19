from dataclasses import dataclass

from entities.Course import Course
from entities.User import User


@dataclass
class CourseEnrolled:
    course: Course
    student: User
    is_finished: bool

    def __init__(
        self,
        course: Course,
        student: User,
        is_finished: bool
    ):
        self.course = course
        self.student = student
        self.is_finished = is_finished

