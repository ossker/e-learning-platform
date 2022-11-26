from typing import List

from models.TutorialModel import TutorialModel


def find_tutorials_by_course_id(course_id: int) -> List[TutorialModel]:
    tutorial_models = TutorialModel.query.filter_by(course_id=course_id).all()
    return tutorial_models
