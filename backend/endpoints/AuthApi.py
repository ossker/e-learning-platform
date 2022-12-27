from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_restx import Resource, Namespace, fields

from werkzeug.security import check_password_hash

from factories_implementation.UserFactory import create_user
from mappers.UserMapper import user_entity_to_model
from models.UserModel import UserModel
from stores_implementation.CourseStore import find_all_courses, find_course_by_id
from stores_implementation.UserStore import add_user, find_user_by_username, find_user_by_email, find_user_by_id, \
    find_all_users, update_user

auth_ns = Namespace('auth', description="A namespace for Authentication")

signup_model = auth_ns.model(
    'SignUp',
    {
        "username": fields.String(),
        "first_name": fields.String(),
        "last_name": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model = auth_ns.model(
    'Login',
    {
        'username': fields.String(),
        'password': fields.String()
    }
)

courses_list = auth_ns.model(
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
        "category_id": fields.Integer()
    }
)

course = auth_ns.model(
    "CourseEnrolled",
    {
        "course": fields.List(fields.Nested(courses_list), readonly=True),
        "student_id": fields.Integer(),
        "is_finished": fields.Boolean()
    }
)

user_model_request = auth_ns.model(
    "User",
    {
        "id": fields.Integer(),
        "username": fields.String(),
        "first_name": fields.String(),
        "last_name": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
        "avatar": fields.String(),
        "about_me": fields.String(),
        "fb_link": fields.String(),
        "li_link": fields.String(),
        "yt_link": fields.String(),
        "tw_link": fields.String(),
        "course_associations": fields.List(fields.Nested(course), readonly=True)

    }
)


@auth_ns.route('/signup')
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data['username']
        email = data['email']
        db_user_username = UserModel.query.filter_by(username=username).first()
        db_user_email = UserModel.query.filter_by(username=email).first()
        if db_user_username is not None:
            return jsonify({"message": f"User with username {username} already exists."})
        elif db_user_email is not None:
            return jsonify({"message": f"User with username {email} already exists."})
        new_user_entity = create_user(data)
        new_user_model = user_entity_to_model(new_user_entity)
        add_user(new_user_model)
        return jsonify({"message": "User created successfully."})


@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        db_user = find_user_by_username(username)
        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.email)
            refresh_token = create_refresh_token(identity=db_user.email)
            return jsonify({
                "access_token": access_token,
                "refresh_token": refresh_token
            })
        else:
            return jsonify({"message": f"Invalid username or password."})


@auth_ns.route('/refresh')
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token": new_access_token}), 200)


@auth_ns.route('/actual-user')
class ActualUser(Resource):
    @auth_ns.marshal_list_with(user_model_request)
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        user_model = find_user_by_email(current_user)
        return user_model

@auth_ns.route('/user/<int:id>')
class UserResource(Resource):
    @auth_ns.marshal_with(user_model_request)
    def get(self, id):
        """Get a user by id"""
        user_model = find_user_by_id(id)
        return user_model

    @auth_ns.marshal_with(user_model_request)
    @jwt_required()
    def put(self, id):
        """Update user by id """
        user_to_update = find_user_by_id(id)
        if not user_to_update:
            return None
        data = request.get_json()
        update_user(user_to_update, data)
        return user_to_update

@auth_ns.route('/userCourse/<int:id>')
class UserByCourseIdResource(Resource):
    @auth_ns.marshal_with(user_model_request)
    def get(self, id):
        """Get a user by course id"""
        course = find_course_by_id(id)
        user_model = find_user_by_id(course.owner)
        return user_model

@auth_ns.route('/users')
class UsersResource(Resource):

    @auth_ns.marshal_list_with(user_model_request)
    def get(self):
        """Get all users"""
        users = find_all_users()
        return users
