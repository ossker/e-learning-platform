from typing import List

from exts import db
from models.UserModel import UserModel


def find_user_by_id(user_id) -> UserModel:
    return UserModel.query.filter_by(id=user_id).first()


def find_all_users() -> List[UserModel]:
    return UserModel.query.all()


def find_user_by_email(email: str) -> UserModel:
    return UserModel.query.filter_by(email=email).first()


def find_user_by_username(username: str) -> UserModel:
    return UserModel.query.filter_by(username=username).first()


def update_user(user_model: UserModel, data) -> None:
    username = data.get('username')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    avatar = data.get('avatar')
    about_me = data.get('about_me')
    fb_link = data.get('fb_link')
    li_link = data.get('li_link')
    tw_link = data.get('tw_link')
    yt_link = data.get('yt_link')
    user_model.username = username
    user_model.first_name = first_name
    user_model.last_name = last_name
    user_model.email = email
    user_model.password = password
    user_model.avatar = avatar
    user_model.about_me = about_me
    user_model.fb_link = fb_link
    user_model.li_link = li_link
    user_model.tw_link = tw_link
    user_model.yt_link = yt_link
    db.session.commit()


def add_user(user_model: UserModel) -> None:
    db.session.add(user_model)
    db.session.commit()
