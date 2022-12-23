from exts import db
from models import TopicModel


def add_topic(topic_model: TopicModel) -> None:
    db.session.add(topic_model)
    db.session.commit()


