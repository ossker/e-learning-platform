from flask import request
from flask_jwt_extended import jwt_required
from flask_restx import Resource, Namespace, fields

from factories_implementation.TutorialFactory import create_tutorial
from mappers.TutorialMapper import tutorial_entity_to_model
from stores_implementation.TutorialStore import find_tutorials_by_course_id, add_tutorial, find_all_tutorials, \
    get_duration_of_tutorials_by_course_id, delete_tutorial, find_tutorial_by_id

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


@tutorial_ns.route('/tutorials-course/<int:id>')
class TutorialsCourseResource(Resource):
    @tutorial_ns.marshal_list_with(tutorial_model_request)
    def get(self, id):
        """Get tutorials by course id"""
        tutorials = find_tutorials_by_course_id(id)
        return tutorials if tutorials else []


@tutorial_ns.route('/tutorials')
class TutorialsResource(Resource):

    @tutorial_ns.marshal_list_with(tutorial_model_request)
    def get(self):
        """Get all tutorials"""
        tutorials = find_all_tutorials()
        return tutorials


    @tutorial_ns.expect(tutorial_model_request)
    @jwt_required()
    def post(self):
        """Create a new tutorial"""
        data = request.get_json()
        new_tutorial_entity = create_tutorial(data)
        if new_tutorial_entity:
            new_tutorial = tutorial_entity_to_model(new_tutorial_entity)
            add_tutorial(new_tutorial)
            return {"status": 1}
        else:
            return {"status": 0}


@tutorial_ns.route('/tutorial/<int:id>')
class TutorialResource(Resource):
    def get(self, id):
        """Get a tutorial by id"""
        pass

    @jwt_required()
    def put(self, id):
        """Update a tutorial by id"""
        pass

    @jwt_required()
    def delete(self, id):
        """Delete a tutorial by id"""
        tutorial_to_delete = find_tutorial_by_id(id)
        if tutorial_to_delete:
            delete_tutorial(tutorial_to_delete)
            return {"status": 1}
        return {"status": 0}

@tutorial_ns.route('/duration-tutorials/<int:id>')
class TutorialsDurationResource(Resource):
    def get(self, id):
        """Get a duration of tutorials by course id"""
        hours = get_duration_of_tutorials_by_course_id(id)
        return hours
