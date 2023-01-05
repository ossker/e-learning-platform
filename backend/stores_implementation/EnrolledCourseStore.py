from typing import List

from sqlalchemy import and_

from exts import db
from models.CourseEnrolledModel import CourseEnrolledModel


def find_enrolled_course_by_course_id_and_student_id(param_course_id, user_id):
    course_model = db.session.query(CourseEnrolledModel).filter(and_(
        CourseEnrolledModel.course_id.like(param_course_id),
        CourseEnrolledModel.student_id.like(user_id)
    )).first()
    return course_model


def find_enrolled_courses_by_course_id(param_course_id) -> List[CourseEnrolledModel]:
    course_models = CourseEnrolledModel.query.filter_by(course_id=param_course_id).all()
    return course_models


def delete_many_enrolled_courses(enrolled_courses: List[CourseEnrolledModel]) -> None:
    for course in enrolled_courses:
        delete_enrolled_course(course)


def delete_enrolled_course(enrolled_course: CourseEnrolledModel) -> None:
    db.session.delete(enrolled_course)
    db.session.commit()


def add_enrolled_course(enrolled_course) -> None:
    db.session.add(enrolled_course)
    db.session.commit()
