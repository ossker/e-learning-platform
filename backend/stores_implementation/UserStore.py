from models.UserModel import UserModel


def find_user_by_id(user_id) -> UserModel:
    return UserModel.query.filter_by(id=user_id).first()
