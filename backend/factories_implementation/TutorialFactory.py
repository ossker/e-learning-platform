from entities import Tutorial, Course
from stores_implementation import CourseStore


class TutorialFactory:
    @staticmethod
    def create_tutorial(data: dict) -> Tutorial:
        title = data.get('title')
        video = data.get('video')
        content = data.get('content')
        course_id = data.get('course_id')
        course = CourseStore.find_by_id(course_id)
        return Tutorial(
            title=title,
            video=video,
            content=content,
            course=course
        )
