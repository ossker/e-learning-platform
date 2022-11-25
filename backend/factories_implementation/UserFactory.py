from werkzeug.security import generate_password_hash

from entities.User import User


def create_user(data: dict) -> User:
    return User(
        username=data.get('username'),
        email=data.get('email'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        password=generate_password_hash(data.get('password'))
    )
