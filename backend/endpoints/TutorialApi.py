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
        # tutorials = TutorialStore.find_all()
        # return tutorials
        pass

    @tutorial_ns.expect(tutorial_model_request)
    @tutorial_ns.marshal_with(tutorial_model_request)
    def post(self):
        """Create a new tutorial"""
        pass
        # data = request.get_json()
        # new_tutorial = TutorialFactory.create_tutorial(data)
        # TutorialStore.add(new_tutorial)
        """data = request.get_json()
               title = data.get('title')
               video = data.get('video')
               content = data.get('content')
               course_id = data.get('course_id')
               course_model = CourseModel.query.filter_by(id=course_id).first()

               tutorials = TutorialStore.find_by_course_id(course_model.id)

               course = Course(
                   name=course_model.name,
                   user=course_model.owner,
                   tutorials=tutorials,
                   description=course_model.description
               )

               new_tutorial = Tutorial(
                   title=title,
                   video=video,
                   content=content,
                   course=course
               )

               tutorial_model = TutorialModel(
                   title=new_tutorial.title,
                   video=new_tutorial.video,
                   content=new_tutorial.content,
                   course_id=new_tutorial.course.get_id()
               )

               db.session.add(tutorial_model)
               db.session.commit()

               """
        # return new_tutorial, 201
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
