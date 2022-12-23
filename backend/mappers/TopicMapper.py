from entities.Topic import Topic
from models import TopicModel


def topic_entity_to_model(topic_entity: Topic) -> TopicModel:
    return TopicModel(
        title=topic_entity.title,
        course_id=topic_entity.course
    )
