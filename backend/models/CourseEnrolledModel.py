from exts import db


class CourseEnrolledModel(db.Model):
    __tablename__ = "course_enrolled"

    student_id = db.Column(db.ForeignKey("user.id"), primary_key=True)
    course_id = db.Column(db.ForeignKey("course.id"), primary_key=True)
    is_finished = db.Column(db.Boolean())

    course = db.relationship("CourseModel", backref="user_associations")
    user = db.relationship("UserModel", backref="course_associations")

    """
    user = User()
    course = Course()
    user.courses.append(course)
    user.course_associations.append(CourseEnrolledModel(course=course))

    """

    def __repr__(self):
        return f"CourseEnrolledModel(student_id={self.student_id}, course_id={self.course_id}, is_finished={self.is_finished})"
