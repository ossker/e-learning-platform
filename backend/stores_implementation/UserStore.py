from exts import db
from models.UserModel import UserModel


def find_user_by_id(user_id) -> UserModel:
    return UserModel.query.filter_by(id=user_id).first()


def find_user_by_email(email: str) -> UserModel:
    return UserModel.query.filter_by(email=email).first()


def find_user_by_username(username: str) -> UserModel:
    return UserModel.query.filter_by(username=username).first()


def add_user(user_model: UserModel) -> None:
    db.session.add(user_model)
    db.session.commit()
