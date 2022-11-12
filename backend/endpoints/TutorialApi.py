from flask import request
from flask_restx import Resource, Namespace, fields

tutorial_ns = Namespace('tutorial', description="A namespace for Tutorial")

tutorial_model_request = tutorial_ns.model(
    "Tutorial",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "video": fields.String(),
        "content": fields.String(),
        "course_id": fields.Integer()
    }
)


@tutorial_ns.route('/tutorials')
class TutorialsResource(Resource):

    @tutorial_ns.marshal_list_with(tutorial_model_request)
    def get(self):
        """Get all tutorials"""
        pass

    @tutorial_ns.expect(tutorial_model_request)
    @tutorial_ns.marshal_with(tutorial_model_request)
    def post(self):
        """Create a new tutorial"""
        pass


@tutorial_ns.route('/tutorial/<int:id>')
class TutorialResource(Resource):
    def get(self, id):
        """Get a tutorial by id"""
        pass

    def put(self, id):
        """Update a tutorial by id"""
        pass

    def delete(self, id):
        """Delete a tutorial by id"""
        pass
