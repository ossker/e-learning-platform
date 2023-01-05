from typing import List

from exts import db
from models import TopicModel


def add_topic(topic_model: TopicModel) -> None:
    db.session.add(topic_model)
    db.session.commit()


def delete_topic(topic_model: TopicModel) -> None:
    db.session.delete(topic_model)
    db.session.commit()


def delete_many_topics_by_course_id(course_id) -> None:
    topic_models = find_topics_by_course_id(course_id)
    for topic in topic_models:
        delete_topic(topic)


def find_topic_by_id(topic_id) -> TopicModel:
    topic_model = TopicModel.query.filter_by(id=topic_id).first()
    return topic_model


def find_topics_by_course_id(param_course_id) -> List[TopicModel]:
    topic_models = TopicModel.query.filter_by(course_id=param_course_id).all()
    return topic_models
