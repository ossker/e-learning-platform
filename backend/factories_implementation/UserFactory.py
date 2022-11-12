from entities import User
from factories import IUserFactory


class UserFactory(IUserFactory):
    def create_user(self, data: dict) -> User:
        pass
