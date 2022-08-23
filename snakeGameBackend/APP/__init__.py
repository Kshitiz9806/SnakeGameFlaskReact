from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import jsonify,make_response,request

app = Flask(__name__)


app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://adarsh:adarsh@127.0.0.1:5432/snakebackend'

db = SQLAlchemy(app)

from .routes import base_bp
app.register_blueprint(base_bp)


@app.route("/test")
def test():
    data = request.get_json()
    print(request.headers)

    resp = make_response(jsonify({"message":f"logged in successfully"}))
    resp.headers.add("Content-Type","application/json")
    return resp