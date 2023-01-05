from exts import db
from models import TopicModel


def add_topic(topic_model: TopicModel) -> None:
    db.session.add(topic_model)
    db.session.commit()


def delete_topic(topic_model: TopicModel) -> None:
    db.session.delete(topic_model)
    db.session.commit()


def find_topic_by_id(topic_id) -> TopicModel:
    topic_model = TopicModel.query.filter_by(id=topic_id).first()
    return topic_model
