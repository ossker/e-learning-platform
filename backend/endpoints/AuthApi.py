from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_restx import Resource, Namespace, fields

from werkzeug.security import check_password_hash

from factories_implementation.UserFactory import create_user
from mappers.UserMapper import user_entity_to_model
from models.UserModel import UserModel
from stores_implementation.UserStore import add_user, find_user_by_username, find_user_by_email

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
    }
)


@auth_ns.route('/signup')
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data['username']
        db_user = UserModel.query.filter_by(username=username).first()
        if db_user is not None:
            return jsonify({"message": f"User with username: {username} already exists."})
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
