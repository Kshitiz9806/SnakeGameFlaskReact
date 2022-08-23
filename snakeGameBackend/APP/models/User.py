#from .. import db


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app,supports_credentials=True)

app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://adarsh:adarsh@127.0.0.1:5432/snakebackend'
#app.config['SESSION_COOKIE_SAMESITE'] = "None"
#before uploading change the username:password
db = SQLAlchemy(app)

# Database ORMs
class User(db.Model):
    __tablename__='user'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100))
    maxscore = db.Column(db.Integer)
    password = db.Column(db.String(80))
    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.maxscore = 0