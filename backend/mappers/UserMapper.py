from entities import User
from models import UserModel


class UserMapper:

    def entity_to_model(self, user_entity: User) -> UserModel:
        pass

    def model_to_entity(self, user_model: UserModel) -> User:
        pass
