from entities.User import User
from models.UserModel import UserModel


def user_entity_to_model(user_entity: User) -> UserModel:
    return UserModel(
        username=user_entity.username,
        first_name=user_entity.first_name,
        last_name=user_entity.last_name,
        email=user_entity.email,
        password=user_entity.password,
        avatar=user_entity.avatar
    )


def user_model_to_entity(user_model: UserModel) -> User:
    pass
