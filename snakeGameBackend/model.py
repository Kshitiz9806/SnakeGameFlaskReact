from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@ip/snakebackend'
#before uploading change the username:password@ip
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