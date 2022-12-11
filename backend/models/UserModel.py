from exts import db


class UserModel(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    avatar = db.Column(db.Text(), nullable=True)
    about_me = db.Column(db.String(1000), nullable=True)
    fb_link = db.Column(db.Text(), nullable=True)
    li_link = db.Column(db.Text(), nullable=True)
    tw_link = db.Column(db.Text(), nullable=True)
    yt_link = db.Column(db.Text(), nullable=True)

    courses_owning = db.relationship("CourseModel")
    courses = db.relationship("CourseModel", secondary="course_enrolled")

    def __repr__(self):
        return f"UserModel(id={self.id}, username={self.username})"
