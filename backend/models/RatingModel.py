# from exts import db
#
#
# class RatingModel(db.Model):
#     __tablename__ = "rating"
#
#     id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
#     rate = db.Column(db.Float(), nullable=False)
#
#     course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
#
#     def __repr__(self):
#         return f"TopicModel(id={self.id}, rate={self.rate})"
