from io import BytesIO

from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_restx import Resource, Namespace, fields

from factories_implementation.CourseFactory import create_course
from mappers.CourseMapper import course_entity_to_model
from stores_implementation.CourseStore import find_all_courses, add_course, find_course_by_id, delete_course, \
    update_course, find_courses_by_owner_id, find_courses_by_logged_user, find_course_by_name
from stores_implementation.EnrolledCourseStore import find_enrolled_course_by_course_id_and_student_id

enrolled_course_ns = Namespace('enrolled_course', description="A namespace for CourseEnrolled")

enrolled_course_model_request = enrolled_course_ns.model(
    "Enrolled Course",
    {
        "student_id": fields.Integer(readOnly=True),
        "course_id": fields.Integer(readOnly=True),
        "is_finished": fields.Boolean()
    }
)


@enrolled_course_ns.route('/enrolled_courses')
class EnrolledCoursesResource(Resource):

    @enrolled_course_ns.marshal_list_with(enrolled_course_model_request)
    def get(self):
        """Get all enrolled courses"""
        # courses = find_all_courses()
        # return courses

    @enrolled_course_ns.expect(enrolled_course_model_request)
    @jwt_required()
    def post(self):
        """Create a new enrolled course"""
        # data = request.get_json()
        # new_course_entity = create_course(data)
        # if new_course_entity:
        #     new_course = course_entity_to_model(new_course_entity)
        #     add_course(new_course)
        #     return {"status": 1, "course_name": new_course.name}
        # else:
        #     return {"status": 0}


@enrolled_course_ns.route('/enrolled_course/<int:course_id>/<int:user_id>/')
class EnrolledCourseResource(Resource):
    @enrolled_course_ns.marshal_with(enrolled_course_model_request)
    @jwt_required()
    def get(self, course_id, user_id):
        """Get a enrolled course by id"""
        enrolled_course_model = find_enrolled_course_by_course_id_and_student_id(course_id, user_id)
        return enrolled_course_model

    @enrolled_course_ns.marshal_with(enrolled_course_model_request)
    @jwt_required()
    def put(self, id):
        """Update a enrolled course by id"""
        # course_to_update = find_course_by_id(id)
        # data = request.get_json()
        # update_course(course_to_update, data)
        # return course_to_update

    @jwt_required()
    def delete(self, id):
        """Delete a enrolled course by id"""
        # course_to_delete = find_course_by_id(id)
        # if course_to_delete:
        #     delete_course(course_to_delete)
        #     return jsonify({"message": f"Course id: {id} deleted."})
        # return jsonify({"message": f"Course id: {id} does not exist."})
