from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask_restx import Resource, Namespace, fields

from factories_implementation.TopicFactory import create_topic
from mappers.TopicMapper import topic_entity_to_model
from stores_implementation.TopicStore import add_topic, find_topic_by_id, delete_topic

topic_ns = Namespace('topic', description="A namespace for Topic")


topic_model_request = topic_ns.model(
    "Topic",
    {
        "id": fields.Integer(readOnly=True),
        "title": fields.String(required=True),
        "course": fields.String(required=True)
    }
)


@topic_ns.route('/topics')
class TopicsResource(Resource):

    @topic_ns.marshal_list_with(topic_model_request)
    def get(self):
        """Get all topics"""
        # topics = find_all_topics()
        # return topics

    @topic_ns.expect(topic_model_request)
    @jwt_required()
    def post(self):
        """Create a new topic"""
        data = request.get_json()
        new_topic_entity = create_topic(data)
        if new_topic_entity:
            new_topic = topic_entity_to_model(new_topic_entity)
            add_topic(new_topic)
            return {"status": 1}
        else:
            return {"status": 0}


@topic_ns.route('/topic/<int:id>')
class TopicResource(Resource):

    @topic_ns.marshal_with(topic_model_request)
    def get(self, id):
        """Get a topic by id"""
        pass

    @jwt_required()
    def delete(self, id):
        """Delete a topic by id"""
        topic_to_delete = find_topic_by_id(id)
        if topic_to_delete:
            delete_topic(topic_to_delete)
            return {"status": 1}
        return {"status": 0}
