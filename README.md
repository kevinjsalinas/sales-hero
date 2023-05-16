# Sales Hero

A full-stack web application that helps managers organize company leads, book sales appointments, and track sales representative performance.

## Installation 

To install and set up the project, follow these steps:

1. Make sure you have Python 3.8 or a compatible version installed on your system.

2. Clone the project repository.

3. Navigate to the project directory.

4. Create a virtual environment for the project. You can use tools like virtualenv or pipenv. For example, using pipenv:

    ```console
    $ pip install pipenv
    $ pipenv install --python 3.8
    ```

5. Activate the virtual environment:

    ```console
    $ pipenv shell
    ```

6. Install the project dependencies:
    ```console
    $ pipenv install
    ```
    This will install the required packages specified in the Pipfile, including Flask, Flask-Restful, Flask-SQLAlchemy, Flask-Migrate, SQLAlchemy-Serializer, Flask-Cors, Bcrypt, and Flask-Bcrypt.

7. Once the installation is complete, navigate to the /server folder and you can start the application's backend (server):

    ```console
    $ python app.py
    ```
    This will run the Flask development server, and you can access your app by navigating to http://localhost:5000 in your web browser or open up another terminal, navigate to the /client folder and hit "npm start"

That's it! You have successfully installed the project and can now start using it.

Note: If you encounter any issues during the installation process, make sure to check that your Python version is compatible and that you have the necessary system dependencies installed (e.g., database drivers if required).

## Usage 

You'll need a login account to use the program, if you don't have one, simply sign up by choosing the sign up option.

Once you login or signup you'll be re-directed to the main page wich is the salesreps page. Here you can update a Sales Reps information (Name, Image, and Close Rate). If you click on the Sales Rep image, you can see what leads are assigned to the Sales Rep. If you click again, you should also see the amount of booked calls a sales rep has.

Heading to the Leads Page, you'll see the number of leads that the program has currently. You can add more leads by entering a lead name, email, and phone numer and hitting submit. Once you submit a lead, it will be added to the table schema below. There you have the option to delete a lead in case you make a mistake or no longer need the lead's information there.

Lastly, in the Calls Page, is where you can assign Sales Reps to Leads. The functionality of this page is to book calls and make sure that Leads are being taken care of by assigning them a sales rep. To book a call simply enter the required inputs in the form, including sales rep name, lead name, date, and time of the call. Once you hit submit, you'll see that a book is added to the table schema as well.

## Technologies Used

- Python (Version 3.8): The primary programming language used for the project.
- Flask: A lightweight and flexible web framework used for building the backend of the application.
- Flask-Restful: An extension for Flask that simplifies the creation of RESTful APIs.
- Flask-SQLAlchemy: A Flask extension that provides an ORM (Object-Relational Mapping) for interacting with databases using SQLAlchemy.
- Flask-Migrate: A Flask extension that handles database migrations for SQLAlchemy-based applications.
- SQLAlchemy-Serializer: A library that provides easy serialization and deserialization of SQLAlchemy models.
- Flask-Cors: A Flask extension that adds Cross-Origin Resource Sharing (CORS) support to handle cross-domain requests.
- Bcrypt: A library for hashing and verifying passwords securely.
- Flask-Bcrypt: A Flask extension that integrates Bcrypt into Flask for password hashing and verification.

These technologies and libraries were used to build the full-stack application, providing a robust and efficient development environment for building web APIs and interacting with databases.

## Database Schema and Models

The application uses a relational database with the following schema and models:

### User Model
- Table Name: **users**
- Columns:
    - **id** (Integer, Primary Key): Unique identifier for each user.
    - **username** (String, Unique, Not Null): The username of the user.
    - **_password_hash** (String): The hashed password of the user.

### SalesRep Model
- Table Name: **salesreps**
- Columns:
    - **id** (Integer, Primary Key): Unique identifier for each sales representative.
    - name (String, Not Null): The name of the sales representative.
    - image (String, Not Null): The image URL for the sales representative.
    - close_rate (Float, Not Null): The close rate of the sales representative.
- Relationships:
    - leads: A relationship with the Lead model.
    - calls: A relationship with the Call model.

### Lead Model
- Table Name: leads
- Columns:
    - id (Integer, Primary Key): Unique identifier for each lead.
    - name (String, Not Null): The name of the lead.
    - phone (String, Not Null): The phone number of the lead.
    - email (String): The email address of the lead.
- Relationships:
    - salesreps: A relationship with the SalesRep model.
    - calls: A relationship with the Call model.

### Call Model
- Table Name: calls
- Columns:
    - id (Integer, Primary Key): Unique identifier for each call.
    - date (String): The date of the call.
    - time (String): The time of the call.
    - salesrep_id (Integer, Foreign Key to salesreps.id): The ID of the associated sales representative.
    - lead_id (Integer, Foreign Key to leads.id): The ID of the associated lead.
- Relationships:
    - salesrep: A relationship with the SalesRep model.
    - lead: A relationship with the Lead model.

These models define the structure of the database tables and their relationships, allowing you to store and retrieve data related to users, sales representatives, leads, and calls.

## APIs and Endpoints 

### `User` 
- POST /signup: Create a new user
- POST /login: Authenticate and Authorize user
- POST /check_session: User authorization check
- POST /logout: Delete user session

### `SalesRep` 
- GET /salesreps: Retrieve a list of all sales representatives.
- PUT /salesreps/{id}: Update details of a specific sales representative.

### `Lead` 
- GET /leads: Retrieve a list of all leads.
- POST /leads: Create a new lead.
- DELETE /leads/{id}: Delete a specific lead.

### `Call`
- GET /calls: Retrieve a list of all calls.
- POST /calls: Create a new call.
- DELETE /calls/{id}: Delete a specific call.

## Credits and Acknowledgements

This project utilizes several open-source packages and libraries that have been instrumental in its development. I would like to acknowledge the following projects and their contributors:

- [Flask](https://flask.palletsprojects.com/): A micro web framework for Python that forms the backbone of our application.
- [Flask-Restful](https://flask-restful.readthedocs.io/): An extension for Flask that simplifies the creation of RESTful APIs.
- [Flask-SQL Alchemy](https://flask-sqlalchemy.palletsprojects.com/): A Flask extension that provides an ORM (Object-Relational Mapping) for working with databases using SQLAlchemy.
- [Flask-Migrate](https://flask-migrate.readthedocs.io/): A Flask extension that handles database migrations for SQLAlchemy-based applications.
- [SQL Alchemy-Serializer](https://sqlalchemy-serializer.readthedocs.io/): A library that enables easy serialization and deserialization of SQLAlchemy models.
- [Flask-Cors](https://flask-cors.readthedocs.io/): A Flask extension that adds Cross-Origin Resource Sharing (CORS) support to handle cross-domain requests.
- [Bcrypt](https://pypi.org/project/bcrypt): A library for securely hashing and verifying passwords.
- [Flask-Bcrypt](https://flask-bcrypt.readthedocs.io/): A Flask extension that integrates Bcrypt into Flask for password hashing and verification.
- [Semantic UI](https://semantic-ui.com/): A modern front-end development framework that provides a clean and intuitive user interface design.
- [Bootstrap](https://getbootstrap.com/): A popular front-end framework that helps in creating responsive and mobile-first websites.

Thank you Flatiron School 2023!