from entities.Tutorial import Tutorial


def create_tutorial(data: dict) -> Tutorial:
    title = data.get('title')
    video = data.get('video')
    course_id = data.get('course')
    return Tutorial(
        title=title,
        video=video,
        course=course_id
    )