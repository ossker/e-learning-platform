from typing import List
from pytube import YouTube
from exts import db
from models.TutorialModel import TutorialModel


def find_tutorials_by_course_id(course_id: int) -> List[TutorialModel]:
    tutorial_models = TutorialModel.query.filter_by(course_id=course_id).all()
    return tutorial_models


def find_all_tutorials() -> List[TutorialModel]:
    tutorial_models = TutorialModel.query.all()
    return tutorial_models


def get_duration_of_tutorials_by_course_id(course_id) -> str:
    tutorials_models = find_tutorials_by_course_id(course_id)
    duration = _get_duration_of_tutorials(tutorials_models)
    return duration


def add_tutorial(tutorial_model: TutorialModel) -> None:
    db.session.add(tutorial_model)
    db.session.commit()


def delete_tutorial(tutorial_model: TutorialModel) -> None:
    db.session.delete(tutorial_model)
    db.session.commit()


def find_tutorial_by_id(tutorial_id) -> TutorialModel:
    tutorial_model = TutorialModel.query.filter_by(id=tutorial_id).first()
    return tutorial_model


def delete_many_tutorials_by_course_id(course_id) -> None:
    tutorial_models = find_tutorials_by_course_id(course_id)
    for tutorial in tutorial_models:
        delete_tutorial(tutorial)


def _get_duration_of_tutorials(tutorials_models) -> str:
    seconds = 0
    for tutorial in tutorials_models:
        yt = YouTube(tutorial.video)
        video_length = yt.length
        seconds += video_length
    hours = _convert_seconds_to_hours(seconds)
    return hours


def _convert_seconds_to_hours(seconds) -> str:
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
    return "%d:%02d:%02d" % (hour, minutes, seconds)
