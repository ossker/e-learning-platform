from io import BytesIO

from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Resource, Namespace, fields

from factories_implementation.CourseEnrolledFactory import create_course_enrolled
from factories_implementation.CourseFactory import create_course
from mappers.CourseEnrolledMapper import course_enrolled_entity_to_model
from mappers.CourseMapper import course_entity_to_model
from stores_implementation.CourseStore import find_all_courses, add_course, find_course_by_id, delete_course, \
    update_course, find_courses_by_owner_id, find_courses_by_logged_user, find_course_by_name
from stores_implementation.EnrolledCourseStore import find_enrolled_course_by_course_id_and_student_id, \
    add_enrolled_course, delete_enrolled_course
from stores_implementation.UserStore import find_user_by_email

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
        data = request.get_json()
        student_id = data['student_id']
        course_id = data['course_id']

        enrolled_course_model = find_enrolled_course_by_course_id_and_student_id(course_id, student_id)
        if enrolled_course_model is not None:
            return jsonify({"status": 2})

        current_user_email = get_jwt_identity()
        actual_user = find_user_by_email(current_user_email)
        course = find_course_by_id(course_id)
        if actual_user.id == course.owner:
            return jsonify({"status": 3})

        new_enrolled_course_entity = create_course_enrolled(data)
        if new_enrolled_course_entity:
            new_enrolled_course_model = course_enrolled_entity_to_model(new_enrolled_course_entity)
            add_enrolled_course(new_enrolled_course_model)
            return {"status": 1,
                    "student_id": new_enrolled_course_model.student_id,
                    "course_id": new_enrolled_course_model.course_id}
        else:
            return {"status": 0}


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
    def delete(self, course_id, user_id):
        """Delete a enrolled course by id"""
        enrolled_course_to_delete = find_enrolled_course_by_course_id_and_student_id(course_id, user_id)
        if enrolled_course_to_delete:
            delete_enrolled_course(enrolled_course_to_delete)
            return {"status": 1}
        return {"status": 0}
