from abc import abstractmethod, ABC

from entities import User


class IUserFactory(ABC):
    @abstractmethod
    def create_user(self, data: dict) -> User:
        pass
