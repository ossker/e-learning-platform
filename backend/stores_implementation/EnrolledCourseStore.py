from sqlalchemy import and_

from exts import db
from models.CourseEnrolledModel import CourseEnrolledModel

def find_enrolled_course_by_course_id_and_student_id(param_course_id, user_id):
    course_model = db.session.query(CourseEnrolledModel).filter(and_(
        CourseEnrolledModel.course_id.like(param_course_id),
        CourseEnrolledModel.student_id.like(user_id)
    )).first()
    return course_model


def add_enrolled_course(enrolled_course) -> None:
    db.session.add(enrolled_course)
    db.session.commit()
