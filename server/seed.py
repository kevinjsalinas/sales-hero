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
    sr1 = SalesRep(name = "Michael Roman", image="https://media.istockphoto.com/id/1371553731/photo/portrait-of-a-young-businessman-using-a-headset-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=gfn9mVWijMJFNPRdzDNZExnvC6qBOkeeol9oJGpEfSM=", close_rate = 80.4)
    sr2 = SalesRep(name = "Henry Rojas", image="https://us.123rf.com/450wm/antoniodiaz/antoniodiaz1412/antoniodiaz141200078/34522826-attractive-hispanic-salesman-handing-over-the-keys-of-a-new-car-focus-on-salesman.jpg?ver=6", close_rate = 70.4)
    sr3 = SalesRep(name = "Melissa Smith", image="https://www.newbernsmiles.com/wp-content/uploads/2020/10/Dental-Bonding.jpg", close_rate = 80.5)
    sales_reps = [sr1, sr2, sr3]

    print("Creating Lead...")
    l1 = Lead(name = "Billy Ted", phone = "973-423-4321", email = 'billyt@gmail.com')
    l2 = Lead(name = "Sam Lopez", phone = "201-302-1836", email = 'samlopez@outlook.com')
    leads = [l1, l2]

    print("Creating Calls...")
    c1 = Call(date="2023-05-25", time="12:30", salesrep = sr1, lead = l2)
    c2 = Call(date="2023-05-20", time="15:00", salesrep = sr2, lead  = l1)
    calls = [c1, c2]

    db.session.add_all(sales_reps)
    db.session.add_all(leads)
    db.session.add_all(calls)
    db.session.commit()

    print("Seeding done!")