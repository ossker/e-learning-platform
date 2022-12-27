from flask import Flask
from flask_jwt_extended import JWTManager

from config import DevConfig
from exts import db
from flask_migrate import Migrate
from flask_restx import Api
from endpoints import (
    auth_ns,
    category_ns,
    tutorial_ns,
    course_ns,
    topic_ns,
    enrolled_course_ns,
)
from models import (
    CourseModel,
    TutorialModel,
    CategoryModel,
    CourseEnrolledModel,
    UserModel,
    TopicModel,
)

from flask_cors import CORS


def create_app(config):
    app = Flask(__name__)

    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)
    api = Api(app, doc='/docs')

    api.add_namespace(auth_ns)
    api.add_namespace(course_ns)
    api.add_namespace(category_ns)
    api.add_namespace(tutorial_ns)
    api.add_namespace(topic_ns)
    api.add_namespace(enrolled_course_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Course": CourseModel,
            "Tutorial": TutorialModel,
            "Category": CategoryModel,
            "CourseEnrolled": CourseEnrolledModel,
            "User": UserModel,
            "Topic": TopicModel
        }

    return app
