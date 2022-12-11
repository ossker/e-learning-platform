from exts import db


class CourseModel(db.Model):
    __tablename__ = "course"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text(), nullable=True)
    owner = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    course_image = db.Column(db.Text(), nullable=True)
    updated_date = db.Column(db.String(100))
    actual_price = db.Column(db.Float(), nullable=True)
    discounted_price = db.Column(db.Float(), nullable=True)
    is_free = db.Column(db.Boolean())
    language = db.Column(db.String(100))

    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    what_you_will_learn = db.relationship("TopicModel")
    tutorials = db.relationship("TutorialModel")

    def __repr__(self):
        return f"CourseModel(id={self.id}, name={self.name})"
