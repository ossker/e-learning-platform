from exts import db


class CourseModel(db.Model):
    __tablename__ = "course"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text(), nullable=True)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    tutorials = db.relationship("TutorialModel")

    def __repr__(self):
        return f"CourseModel(id={self.id}, name={self.name})"
