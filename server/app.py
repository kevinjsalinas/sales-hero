from flask import request, make_response 
from flask_restful import Resource 
from sqlalchemy.exc import IntegrityError

# add 
from config import app, db, api
from models import Call, Lead, SalesRep, User

class Signup(Resource):

    def post(self):
        pass

class SalesReps(Resource):

    def get(self):
        
        sales_reps_list = []

        for sr in SalesRep.query.all():

            sr_dict = {
                'id': sr.id,
                'name': sr.name,
                'close_rate': sr.close_rate
            }

            sales_reps_list.append(sr_dict)

        response = make_response(sales_reps_list, 200)

        return response

api.add_resource(SalesReps, '/salesreps')

class SalesRepByID(Resource):

    def patch(self,id):

        data = request.get_json()

        salesrep = SalesRep.query.filter_by(id=id).first()

        if salesrep == None:

            response = make_response( { 'message': 'sales rep does not exist'}, 404)

            return response

        for attr in data:
            setattr(salesrep, attr, data[attr])

        try:
            db.session.add(salesrep)
            db.session.commit()

            salesrep_dict = salesrep.to_dict()

            response = make_response(salesrep_dict, 202)

        except: 
            db.session.rollback()
            response = make_response({ 'message': 'validation errors' }, 422)

        return response
              
api.add_resource(SalesRepByID, '/salesreps/<int:id>')

class Leads(Resource):

    def post(self):

        data = request.get_json()

        try:
            new_lead = Lead(name=data['name'], phone=data['phone'], email=data['email'])

            db.session.add(new_lead)
            db.session.commit()

            new_lead_dict = new_lead.to_dict()

            response = make_response(new_lead_dict, 201)

        except:

            db.session.rollback()
            response = make_response({'message': 'validation errors'}, 422)

        return response

api.add_resource(Leads, '/leads')

class LeadByID(Resource):

    def delete(self,id):
        
        lead = Lead.query.filter_by(id=id).first()

        if lead == None:

            response = make_response({'message': 'lead not found'}, 404)

        else:

            db.session.delete(lead)
            db.session.commit()

            response = make_response({}, 204)

        return response

api.add_resource(LeadByID, '/leads/<int:id>')

class Calls(Resource):

    def post(self):

        data = request.get_json()

        try:
            new_call = Call(salesrep_id=data['salesrep_id'], lead_id=data['lead_id'])

            db.session.add(new_call)
            db.session.commit()

            new_call_dict = new_call.to_dict()

            response = make_response(new_call_dict, 201)

        except:

            db.session.rollback()
            response = make_response({'message': 'validation errors'}, 422)

        return response

api.add_resource(Calls, '/calls')


class Home(Resource):
    def get(self):
        return {'message': 'hello'}

api.add_resource(Home, '/')



if __name__ == '__main__':
    app.run(port=5555, debug=True)