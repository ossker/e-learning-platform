from abc import abstractmethod, ABC

from entities import Category


class ICategoryFactory(ABC):
    @abstractmethod
    def create_category(self, data: dict) -> Category:
        pass
