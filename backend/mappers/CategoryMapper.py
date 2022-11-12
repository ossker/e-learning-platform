from entities import Category
from models import CategoryModel


class CategoryMapper:

    def entity_to_model(self, category_entity: Category) -> CategoryModel:
        pass

    def model_to_entity(self, category_model: CategoryModel) -> Category:
        pass
