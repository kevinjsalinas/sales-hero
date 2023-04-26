from flask import request, make_response 
from flask_restful import Resource 
from sqlalchemy.exc import IntegrityError

from config import app, db, api

from models import Call, Lead, SalesRep

class Home(Resource):
    def get(self):
        return {'message': 'hello'}


api.add_resource(Home, '/')



if __name__ == '__main__':
    app.run(port=5555, debug=True)