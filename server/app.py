from flask import request, make_response 
from flask_restful import Resource 
from sqlalchemy.exc import IntegrityError

from config import app, db, api

from models import Call, Lead, SalesRep

class SalesReps(Resource):

    def get(self):
        pass

api.add_resource(SalesReps, '/salesreps')

class SalesRepByID(Resource):

    def patch(self,id):
        pass 

api.add_resource(SalesRepByID, '/salesreps/<int:id>')

class Leads(Resource):

    def post(self):
        pass 

api.add_resource(Leads, '/leads')

class LeadByID(Resource):

    def delete(self,id):
        pass

api.add_resource(LeadByID, '/leads/<int:id>')

class Calls(Resource):

    def post(self):
        pass

api.add_resource(Calls, '/calls')





class Home(Resource):
    def get(self):
        return {'message': 'hello'}

api.add_resource(Home, '/')



if __name__ == '__main__':
    app.run(port=5555, debug=True)