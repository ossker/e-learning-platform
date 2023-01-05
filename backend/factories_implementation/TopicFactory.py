from entities.Topic import Topic


def create_topic(data: dict):
    title = data.get('title')
    course_id = data.get('course')
    return Topic(
        title=title,
        course=course_id
    )