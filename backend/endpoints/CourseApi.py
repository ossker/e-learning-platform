from flask import request
from flask_restx import Resource, Namespace, fields

course_ns = Namespace('course', description="A namespace for Course")

tutorials_list = course_ns.model(
    "Tutorials",
    {
        "tutorial_id": fields.Integer(required=True)
    }
)

course_model_request = course_ns.model(
    "Course",
    {
        "id": fields.Integer(),
        "name": fields.String(),
        "description": fields.String(),
        "owner_id": fields.Integer(),
        "tutorials": fields.List(fields.Nested(tutorials_list))
    }
)


@course_ns.route('/courses')
class CoursesResource(Resource):

    @course_ns.marshal_list_with(course_model_request)
    def get(self):
        """Get all courses"""
        pass

    @course_ns.expect(course_model_request)
    @course_ns.marshal_with(course_model_request)
    def post(self):
        """Create a new course"""
        pass

@course_ns.route('/course/<int:id>')
class CourseResource(Resource):
    def get(self, id):
        """Get a course by id"""
        pass

    def put(self, id):
        """Update a course by id"""
        pass

    def delete(self, id):
        """Delete a course by id"""
        pass
