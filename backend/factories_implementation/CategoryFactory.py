from entities import Category
from factories import ICategoryFactory


class CategoryFactory(ICategoryFactory):
    def create_category(self, data: dict) -> Category:
        pass
