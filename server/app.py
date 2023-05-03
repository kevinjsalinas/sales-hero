# add session
from flask import request, make_response, session 
from flask_restful import Resource 
from sqlalchemy.exc import IntegrityError

# add 
from config import app, db, api
from models import Call, Lead, SalesRep, User

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session',
        # '/'
    ]

    # if NOT in this list + NOT logged in = error
    # if NOT in this list + logged in = continue
    # if in this list + not logged in = continue 
    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
       
        response = make_response( { 'error': 'Unauthorized'}, 401)

        return response

class Signup(Resource):

    def post(self):
        
        data = request.get_json()

        new_user = User(username=data['username'])

        new_user.password_hash = data.get('password')

        try:

            db.session.add(new_user)
            db.session.commit()

            session['new_user_id'] = new_user.id

            new_user_dict = new_user.to_dict()

            response = make_response(new_user_dict, 201)

        except IntegrityError:

            db.session.rollback()

            response = make_response({'error': 'username already exists'}, 422)

        return response

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):

    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id

                user_dict = user.to_dict()

                response = make_response(user_dict, 200)

                return response

        response = make_response ({ 'error': 'Unauthorized'}, 401)

        return response

api.add_resource(Login, '/login', endpoint='login')

class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter_by(id=session['user_id']).first()

            user_dict = user.to_dict()

            response = make_response(user_dict, 200)

            return response

        response = make_response({'error': '401 Unauthorized'}, 401)

        return response

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Logout(Resource):

    def delete(self):

        session['user_id'] = None

        response = make_response({}, 204)

        return response

api.add_resource(Logout, '/logout', endpoint='logout')

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

api.add_resource(SalesReps, '/salesreps', endpoint='salesreps')

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
              
api.add_resource(SalesRepByID, '/salesreps/<int:id>', endpoint='salesrepsbyid')

class Leads(Resource):

    def get(self):
        
        leads_list = []

        for l in Lead.query.all():

            l_dict = {
                'id': l.id,
                'name': l.name,
                'phone': l.phone,
                'email': l.email
            }

            leads_list.append(l_dict)

        response = make_response(leads_list, 200)

        return response

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

api.add_resource(Leads, '/leads', endpoint='leads')

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

api.add_resource(LeadByID, '/leads/<int:id>', endpoint='leadsbyid')

class Calls(Resource):

    def get(self):

        call_list = []

        for call in Call.query.all():
            call_appointment = {
                'call id': call.id,
                'salesrep': {
                    'salesrep id': call.salesrep.id,
                    'name': call.salesrep.name
                },
                'lead': {
                    'lead id': call.lead.id,
                    'name': call.lead.name
                }
            }
            call_list.append(call_appointment)
        
        response = make_response(call_list, 200)

        return response

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

api.add_resource(Calls, '/calls', endpoint='calls')


# class Home(Resource):
#     def get(self):
#         return {'message': 'hello'}

# api.add_resource(Home, '/', endpoint='/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)