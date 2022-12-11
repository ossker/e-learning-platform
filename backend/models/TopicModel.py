from exts import db


class TopicModel(db.Model):
    __tablename__ = "topic"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

    def __repr__(self):
        return f"TopicModel(id={self.id}, title={self.title})"
