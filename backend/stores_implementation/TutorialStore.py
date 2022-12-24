from typing import List

from exts import db
from models.TutorialModel import TutorialModel


def find_tutorials_by_course_id(course_id: int) -> List[TutorialModel]:
    tutorial_models = TutorialModel.query.filter_by(course_id=course_id).all()
    return tutorial_models

def find_all_tutorials() -> List[TutorialModel]:
    tutorial_models = TutorialModel.query.all()
    return tutorial_models

def add_tutorial(tutorial_model: TutorialModel) -> None:
    db.session.add(tutorial_model)
    db.session.commit()