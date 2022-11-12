from abc import abstractmethod, ABC

from entities import Tutorial


class ITutorialFactory(ABC):
    @abstractmethod
    def create_tutorial(self, data: dict) -> Tutorial:
        pass
