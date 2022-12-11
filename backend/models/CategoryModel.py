from exts import db



class CategoryModel(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.Text(), nullable=True)

    courses = db.relationship("CourseModel")


    def __repr__(self):
        return f"CategoryModel(id={self.id}, name={self.name})"
