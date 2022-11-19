from flask import request
from flask_restx import Resource, Namespace, fields

from factories_implementation.CategoryFactory import create_category
from stores_implementation.CategoryStore import find_all_categories, add_category, delete_category, find_category_by_id
from mappers.CategoryMapper import category_entity_to_model

category_ns = Namespace('category', description="A namespace for Category")

courses_list = category_ns.model(
    "Courses",
    {
        "course_id": fields.Integer(required=True),
        "name": fields.String()
    }
)

category_model_request = category_ns.model(
    "Category",
    {
        "id": fields.Integer(readOnly=True),
        "name": fields.String(required=True)
    }
)


@category_ns.route('/categories')
class CategoriesResource(Resource):

    @category_ns.marshal_list_with(category_model_request)
    def get(self):
        """Get all categories"""
        categories = find_all_categories()
        return categories

    @category_ns.expect(category_model_request)
    @category_ns.marshal_with(category_model_request)
    def post(self):
        """Create a new category"""
        data = request.get_json()
        new_category_entity = create_category(data)
        new_category = category_entity_to_model(new_category_entity)
        add_category(new_category)
        return new_category


@category_ns.route('/category/<int:id>')
class CategoryResource(Resource):

    @category_ns.marshal_with(category_model_request)
    def get(self, id):
        """Get a category by id"""
        category_model = find_category_by_id(id)
        return category_model

    @staticmethod
    def delete(id):
        """Delete a category by id"""
        category_to_delete = find_category_by_id(id)
        if category_to_delete:
            delete_category(category_to_delete)
            return f"Category id: {id} deleted."
        return f"Category id: {id} does not exist."
