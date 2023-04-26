from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 
from app import app
from models import db, Call, Lead, SalesRep

with app.app_context():

    print("Deleting data...")
    SalesRep.query.delete()
    Lead.query.delete()
    Call.query.delete()

    print("Creating Sales Rep...")
    sr1 = SalesRep(name = "Michael Roman", close_rate = 80.4)
    sr2 = SalesRep(name = "Henry Rojas", close_rate = 70.4)
    sales_reps = [sr1, sr2]

    print("Creating Lead...")
    l1 = Lead(name = "Billy Ted", phone = "973-423-4321", email = 'billyt@gmail.com')
    l2 = Lead(name = "Sam Lopez", phone = "201-302-1836", email = 'samlopez@outlook.com')
    leads = [l1, l2]

    print("Creating Calls...")
    c1 = Call(salesrep = sr1, lead = l2)
    c2 = Call(salesrep = sr2, lead  = l1)
    calls = [c1, c2]

    db.session.add_all(sales_reps)
    db.session.add_all(leads)
    db.session.add_all(calls)
    db.session.commit()

    print("Seeding done!")