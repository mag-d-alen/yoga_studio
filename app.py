from crypt import methods
from dataclasses import fields
from email import message
from flask import Flask, jsonify, request
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_mail import Mail, Message
import os


app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'yoga.db')
app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
app.config["MAIL_SERVER"] = os.environ["MAIL_SERVER"]
app.config["MAIL_USERNAME"] = os.environ["MAIL_USERNAME"]
app.config["MAIL_PASSWORD"] = os.environ["MAIL_PASSWORD"]




db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)
mail = Mail(app)



# db models - could be in a different file


class_participants = db.Table('class_participants',
    db.Column('class_id', Integer, ForeignKey('class.id')),
    db.Column('user_id', Integer, ForeignKey('user.id')))



class User(db.Model):
    __tablename__ = "user"
    id = Column(Integer, primary_key = True)    
    first_name = Column(String)
    last_name = Column(String)
    email= Column(String)
    password = Column(String)
    class_id = Column(Integer, ForeignKey("class.id"))


class YogaClass(db.Model):
    __tablename__ = "class"
    id = Column(Integer, primary_key = True)   
    user_id = Column(Integer, ForeignKey("user.id"))
    class_type = Column(String)
    teacher_name= Column(String)
    description = Column(String)
    participants = db.relationship('User',
                                secondary="class_participants",
                                backref="class",
                                lazy='dynamic')




class UserSchema(ma.Schema):
    class Meta:
        fields = ("id",
    "first_name",
        "last_name",
        "email",
        "password",)

class YogaClassSchema(ma.Schema):
    class Meta:
        fields = ("id","class_type","teacher_name", "description")


user_schema = UserSchema()
users_schema = UserSchema(many=True)
yoga_class_schema = YogaClassSchema()
yoga_classes_schema = YogaClassSchema(many=True)



# cli commands : create db, destroy db, seed db

@app.cli.command("db_create")
def db_create():
    db.create_all()
    print("Db created")

@app.cli.command("db_drop")
def db_drop():
    db.drop_all()
    print("Db dropped")

@app.cli.command("db_seed")
def db_seed():
    ashtanga = YogaClass(class_type = "Ashtanga", description = "Description here", teacher_name = "Deepak")
    vinyasa = YogaClass(class_type = "Vinyasa", description = "Description here", teacher_name = "Prianka")
    hatha = YogaClass(class_type = "Hatha", description = "Description here", teacher_name = "Vishwejeet")
    acroyoga = YogaClass(class_type = "Acro Yoga", description = "Description here", teacher_name = "Deepak")
   
    db.session.add(ashtanga)
    db.session.add(vinyasa)
    db.session.add(hatha)
    db.session.add(acroyoga)

    test_user = User(first_name = "Johannes",
        last_name = "Kepler",
        email= "kepler@hre.prague.cz",
        password = "1234")
    db.session.add(test_user)
    db.session.commit()
    print("db seeded")


#planets project routes    

@app.route("/yoga_classes", methods = ["GET"])
def yoga_classes():
    yoga_classes_list = YogaClass.query.all()
    result = yoga_classes_schema.dump(yoga_classes_list)
    return jsonify(result)


@app.route("/register", methods =["POST"])
def register():
    email = request.json["email"] 
    test = User.query.filter_by(email=email).first()
    if test:
        return jsonify(message = "That email already exists"), 409
    else:
        first_name = request.json["first_name"]
        last_name = request.json["last_name"]
        password = request.json["password"]
        user = User(first_name= first_name, last_name = last_name, password = password, email = email)
        db.session.add(user)
        db.session.commit()
        return jsonify(message=f"{user.first_name} added to the db"), 200




@app.route("/login", methods = ["POST"])
def login():
    if request.is_json:
        email = request.json["email"]
        password = request.json["password"]
    else:
        email = request.form["email"]
        password = request.form["password"]
    test = User.query.filter_by(email=email, password = password).first()
    if test:
        access_token = create_access_token(identity=email)
        return jsonify(message="Loggin successful", access_token=access_token)
    else:
        return jsonify(message="Wrong email or password"), 401


@app.route("/retrieve_pass/<string:email>", methods=["POST"])
def retrieve_pass(email:str):
    user = User.query.filter_by(email = email).first()
    if user:
        msg = Message(f"Your password is {user.password}",
            sender = "admmin@sevenpaths.ohm.com",
            recipients=[email])
        mail.send(msg)
        return jsonify(message = f"Password sent to {email}")
    else:
        return jsonify("Email does not exist")


    
@app.route("/yoga_class_details/<int:id>", methods =["GET"])
def yoga_class_details(id:int):
    yoga_class = YogaClass.query.filter_by(id = id).first()
    if yoga_class:
        result = yoga_class_schema.dump(yoga_class)
        return jsonify(message = result)
    else:
        return jsonify(message = "Class not found")


@app.route("/add_yoga_class", methods =["POST"])
@jwt_required()
def add_yoga_class():
    class_type = request.json["class_type"] if request.is_json else request.form["class_type"]
    teacher_name = request.json["teacher_name"] if request.is_json else request.form["teacher_name"]
    description = request.json["description"] if request.is_json else request.form["description"]
    
    test = YogaClass.query.filter_by(class_type = class_type).first()
    if not test:
        new_class = YogaClass(class_type = class_type, teacher_name = teacher_name, description= description,)
        db.session.add(new_class)
        db.session.commit()
        return jsonify(message = f"{class_type} successfully added"), 201
    else:
        return jsonify(message = f"{class_type} already exists"), 409


@app.route("/update_class/<int:id>", methods =["PUT"])
@jwt_required()
def update_class(id:int):
    yoga_class = YogaClass.query.filter_by(id = id).first()
    if yoga_class:
        class_type = request.json["class_type"] if request.is_json else request.form["class_type"]
        description = request.json["description"] if request.is_json else request.form["descriptione"]
        teacher_name = request.json["teacher_name"] if request.is_json else request.form["teacher_name"]
       
        
        db.session.commit()
        return jsonify(message = f"{class_type} successfully updated"), 202
    else:
        return jsonify(message = f"{class_type} already exists"), 409


@app.route("/delete_class/<int:id>", methods = ["DELETE"])
@jwt_required()
def delete_class(id:int):
    yoga_class = YogaClass.query.filter_by(id = id).first()
    yoga_type = yoga_class.class_type
    if yoga_class:
        db.session.delete(yoga_class)
        db.session.commit()
        return jsonify(message = f"{yoga_type} successfully deleted"), 202
    else:
        return jsonify(message = "This class does not exists"), 404



#learning routing


@app.route("/")
def hello_world():
    return """<h2>Hello, World!</h2>
    <div>haha</div>"""


@app.route("/about")
def about():
    return jsonify(message= "hello from the about page")


@app.route("/params")
def params():
     name = request.args.get("name")
     age =  int(request.args.get("age"))
     if age < 18 :
        return jsonify(message=f"Sorry {name}, you are not old enough")
     else:
        return jsonify(message="Welcome " + name)
    

@app.route("/params_vars/<string:name>/<int:age>")
def params_vars(name:str, age:int):
     if age < 18 :
        return jsonify(message=f"Sorry {name}, you are not old enough")
     else:
        return jsonify(message="Welcome " + name)


app.run(debug=True)