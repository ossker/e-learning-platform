from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_restx import Resource, Namespace, fields

from factories_implementation.CourseFactory import create_course
from mappers.CourseMapper import course_entity_to_model
from stores_implementation.CourseStore import find_all_courses, add_course, find_course_by_id, delete_course, \
    update_course, find_courses_by_owner_id

course_ns = Namespace('course', description="A namespace for Course")

tutorials_list = course_ns.model(
    "Tutorials",
    {
        "id": fields.Integer(required=True)
    }
)

course_model_request = course_ns.model(
    "Course",
    {
        "id": fields.Integer(readOnly=True),
        "name": fields.String(),
        "description": fields.String(),
        "owner": fields.Integer(),
        "tutorials": fields.List(fields.Nested(tutorials_list), readonly=True)
    }
)





@course_ns.route('/courses')
class CoursesResource(Resource):

    @course_ns.marshal_list_with(course_model_request)
    def get(self):
        """Get all courses"""
        courses = find_all_courses()
        return courses

    @course_ns.expect(course_model_request)
    @course_ns.marshal_with(course_model_request)
    @jwt_required()
    def post(self):
        """Create a new course"""
        data = request.get_json()
        new_course_entity = create_course(data)
        if new_course_entity:
            new_course = course_entity_to_model(new_course_entity)
            add_course(new_course)
            return new_course
        else:
            return []


@course_ns.route('/course/<int:id>')
class CourseResource(Resource):

    @course_ns.marshal_with(course_model_request)
    def get(self, id):
        """Get a course by id"""
        course_model = find_course_by_id(id)
        return course_model if course_model else []

    @course_ns.marshal_with(course_model_request)
    @jwt_required()
    def put(self, id):
        """Update a course by id"""
        course_to_update = find_course_by_id(id)
        data = request.get_json()
        update_course(course_to_update, data)
        return course_to_update

    @jwt_required()
    def delete(self, id):
        """Delete a course by id"""
        course_to_delete = find_course_by_id(id)
        if course_to_delete:
            delete_course(course_to_delete)
            return jsonify({"message": f"Course id: {id} deleted."})
        return jsonify({"message": f"Course id: {id} does not exist."})


@course_ns.route('/courses-owner')
class CoursesOwnerResource(Resource):
    @course_ns.marshal_list_with(course_model_request)
    @jwt_required()
    def get(self):
        """Get courses by owner id"""
        courses = find_courses_by_owner_id()
        return courses if courses else []
