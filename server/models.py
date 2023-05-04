from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

# added bcrypt
from config import db, bcrypt

from sqlalchemy.ext.hybrid import hybrid_property

# insert models 

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class SalesRep(db.Model, SerializerMixin):

    __tablename__ = 'salesreps'

    serialize_rules = ('-calls', 'leads')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    close_rate = db.Column(db.Float, nullable=False)
    # add image for rep 


    leads = association_proxy('calls', 'lead' )
    calls = db.relationship('Call', backref='salesrep')

class Lead(db.Model, SerializerMixin):

    __tablename__ = 'leads'

    serialize_rules = ('-calls',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String)

    salesreps = association_proxy('calls', 'salesrep' )
    calls = db.relationship('Call', backref='lead', cascade="all, delete-orphan")

class Call (db.Model, SerializerMixin):

    __tablename = 'calls'

    serialize_rules = ('-lead.calls', '-salesrep.calls')

    id = db.Column(db.Integer, primary_key=True)
    salesrep_id = db.Column(db.Integer, db.ForeignKey('salesreps.id'))
    lead_id = db.Column(db.Integer, db.ForeignKey('leads.id'))

    created_at = db.Column(db.DateTime, server_default = db.func.now())

    @validates('salesrep_id')
    def validates_salesrep_id(self, key, value):
        salesreps = SalesRep.query.all()
        ids = [salesrep.id for salesrep in salesreps]

        if not value:
            raise ValueError('SalesRep must be provided.')
        elif not value in ids:
            raise ValueError('SalesRep must exist.')
        return value

    @validates('lead_id')
    def validates_lead_id(self, key, value):
        leads = Lead.query.all()
        ids = [lead.id for lead in leads]

        if not value:
            raise ValueError('Lead must be provided.')
        elif not value in ids:
            raise ValueError('Lead must exist.')
        return value 
