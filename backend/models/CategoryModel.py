from exts import db

category_to_course_table = db.Table(
    "category_to_course",
    db.Column("category_id", db.Integer, db.ForeignKey("category.id"), primary_key=True),
    db.Column("course_id", db.Integer, db.ForeignKey("course.id"), primary_key=True)
)


class CategoryModel(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)

    courses = db.relationship("CourseModel", secondary=category_to_course_table, backref="courses")

    """
    category = Category()
    course = Course()
    category.courses.append(course)
    """

    def __repr__(self):
        return f"CategoryModel(id={self.id}, name={self.name})"
