from flask_restx import Resource, Namespace, fields

category_ns = Namespace('category', description="A namespace for Category")

courses_list = category_ns.model(
    "Courses",
    {
        "course_id": fields.Integer(required=True)
    }
)

category_model_request = category_ns.model(
    "Category",
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "courses": fields.List(fields.Nested(courses_list))
    }
)


@category_ns.route('/categories')
class CategoriesResource(Resource):

    @category_ns.marshal_list_with(category_model_request)
    def get(self):
        """Get all categories"""
        pass

    @category_ns.expect(category_model_request)
    @category_ns.marshal_with(category_model_request)
    def post(self):
        """Create a new category"""
        pass


@category_ns.route('/category/<int:id>')
class CategoryResource(Resource):
    def get(self, id):
        """Get a category by id"""
        pass

    def put(self, id):
        """Update a category by id"""
        pass

    def delete(self, id):
        """Delete a category by id"""
        pass
