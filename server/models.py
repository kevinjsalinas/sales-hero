from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db

# insert models 

class SalesRep(db.Model, SerializerMixin):

    __tablename__ = 'salesreps'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    close_rate = db.Column(db.Float, nullable=False)
    # add image for rep 


    calls = db.relationship('Call', backref='salesrep')


class Lead(db.Model, SerializerMixin):

    __tablename__ = 'leads'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    calls = db.relationship('Call', backref='lead')

class Call (db.Model, SerializerMixin):

    __tablename = 'calls'

    id = db.Column(db.Integer, primary_key=True)
    salesrep_id = db.Column(db.Integer, db.ForeignKey('salesreps.id'))
    lead_id = db.Column(db.Integer, db.ForeignKey('leads.id'))

    created_at = db.Column(db.DateTime, server_default = db.func.now())
