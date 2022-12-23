from entities.Topic import Topic


def create_topic(data: dict):
    title = data.get('title')
    course_id = data.get('course_id')
    return Topic(
        title=title,
        course=course_id
    )