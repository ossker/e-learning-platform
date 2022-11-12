from dataclasses import dataclass


@dataclass
class User:
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    avatar: str

    def __init__(
        self,
        username: str,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        avatar: str
    ):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.avatar = avatar
