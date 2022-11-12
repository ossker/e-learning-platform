from exts import db


class TutorialModel(db.Model):
    __tablename__ = "tutorial"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    video = db.Column(db.Text(), nullable=True)
    content = db.Column(db.Text(), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __repr__(self):
        return f"TutorialModel(id={self.id}, title={self.title})"
