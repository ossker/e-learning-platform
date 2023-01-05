from io import BytesIO

from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_restx import Resource, Namespace, fields

from factories_implementation.CourseFactory import create_course
from mappers.CourseMapper import course_entity_to_model
from stores_implementation.CourseStore import find_all_courses, add_course, find_course_by_id, delete_course, \
    update_course, find_courses_by_owner_id, find_courses_by_logged_user, find_course_by_name
from stores_implementation.EnrolledCourseStore import find_enrolled_courses_by_course_id, delete_many_enrolled_courses
from stores_implementation.TopicStore import delete_many_topics_by_course_id
from stores_implementation.TutorialStore import delete_many_tutorials_by_course_id

course_ns = Namespace('course', description="A namespace for Course")

tutorials_list = course_ns.model(
    "Tutorials",
    {
        "id": fields.Integer(required=True),
        "title": fields.String(),
        "video": fields.String()
    }
)

topics_list = course_ns.model(
    "Topics",
    {
        "id": fields.Integer(required=True),
        "title": fields.String()
    }
)
course_model_request = course_ns.model(
    "Course",
    {
        "id": fields.Integer(readOnly=True),
        "name": fields.String(),
        "description": fields.String(),
        "owner": fields.Integer(),
        "course_image": fields.String(),
        "updated_date": fields.String(),
        "actual_price": fields.Float(),
        "discounted_price": fields.Float(),
        "is_free": fields.Boolean(),
        "language": fields.String(),
        "category_id": fields.Integer(),
        "what_you_will_learn": fields.List(fields.Nested(topics_list), readonly=True),
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
    @jwt_required()
    def post(self):
        """Create a new course"""
        data = request.get_json()
        new_course_entity = create_course(data)
        if new_course_entity:
            new_course = course_entity_to_model(new_course_entity)
            add_course(new_course)
            return {"status": 1, "course_name": new_course.name}
        else:
            return {"status": 0}


@course_ns.route('/course/<int:id>')
class CourseResource(Resource):

    @course_ns.marshal_with(course_model_request)
    def get(self, id):
        """Get a course by id"""
        course_model = find_course_by_id(id)
        return course_model if course_model else []

    @course_ns.expect(course_model_request)
    @jwt_required()
    def put(self, id):
        """Update a course by id"""
        course_to_update = find_course_by_id(id)
        data = request.get_json()
        msg = update_course(course_to_update, data)
        return msg

    @jwt_required()
    def delete(self, id):
        """Delete a course by id"""
        course_to_delete = find_course_by_id(id)
        if course_to_delete:
            enrolled_courses_to_delete = find_enrolled_courses_by_course_id(course_to_delete.id)
            delete_many_enrolled_courses(enrolled_courses_to_delete)
            delete_many_topics_by_course_id(course_to_delete.id)
            delete_many_tutorials_by_course_id(course_to_delete.id)
            delete_course(course_to_delete)
            return {"status": 1}
        return {"status": 0}


@course_ns.route('/courses-owner/<int:id>')
class CoursesOwnerResource(Resource):
    @course_ns.marshal_list_with(course_model_request)
    def get(self, id):
        """Get courses by owner id"""
        courses = find_courses_by_owner_id(id)
        return courses if courses else []


@course_ns.route('/course-by-name/<string:name>')
class CourseResource(Resource):
    @course_ns.marshal_with(course_model_request)
    def get(self, name):
        """Get a course by name"""
        course_model = find_course_by_name(name)
        return course_model if course_model else []


@course_ns.route('/my-courses')
class CoursesOwnerResource(Resource):
    @jwt_required()
    @course_ns.marshal_list_with(course_model_request)
    def get(self):
        """Get logged user courses """
        courses = find_courses_by_logged_user()
        return courses if courses else []


@course_ns.route('/course-image')
class CourseImageResource(Resource):
    def post(self):
        """Handles the upload of a file."""
        d = {}
        file_content = ""
        try:
            file = request.files['course_image']
            filename = file.filename
            print(f"Uploading file {filename}")
            file_bytes = file.read()
            file_content = BytesIO(file_bytes).readlines()
            print(file_content)
            d['status'] = 1
        except Exception as e:
            print(f"Couldn't upload file {e}")
            d['status'] = 0

        return jsonify(d)
