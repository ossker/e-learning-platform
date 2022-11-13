from typing import List
from entities import Tutorial
from exts import db


class TutorialStore:
    @staticmethod
    def add(tutorial: Tutorial) -> None:
        tutorial_model = TutorialMapper.entity_to_model(tutorial)
        db.session.add(tutorial_model)
        db.session.commit()

    def delete(self, tutorial: Tutorial) -> None:
        pass

    @staticmethod
    def find_by_course_id(course_id: int):
        tutorial_models = TutorialModel.query.filter_by(id=course_id).all()
        return [TutorialMapper.model_to_entity(tutorial) for tutorial in tutorial_models]

    @staticmethod
    def find_all():
        tutorial_models = TutorialModel.query.all()
        return [TutorialMapper.model_to_entity(tutorial) for tutorial in tutorial_models]


from mappers import TutorialMapper
from models import TutorialModel
