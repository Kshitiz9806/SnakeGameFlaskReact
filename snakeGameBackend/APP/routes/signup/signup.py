from flask import Blueprint, jsonify,request,make_response
from flask_cors import cross_origin
from ...models import User
from ...utils import JWT
from ...models import db
#from ....model import

sup_bp = Blueprint('auth',__name__,url_prefix="/sup")

@sup_bp.route("/",methods=['POST'])
@sup_bp.route("",methods=['POST'])
#uncomment these for actual deployment
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    username = data.get("username")

    user =  User.query.filter_by(username=username).first()
    if user:
        resp = make_response((jsonify(message="username already exists")))
        resp.headers.add("Content-Type","application/json")
        resp.status_code = 401
        return resp
    
    password = data.get("password")

    newuser = User(username, password)
    db.session.add(newuser)
    db.session.commit()
    


    # #remove token for actual deployment
    token = JWT.tokenizer({"username":username,"password":password})
    resp = make_response(jsonify({"message":"user authenticated","token":str(token,'UTF-8')}))
    #resp.set_cookie('token',token,httponly=True,samesite=None)
    resp.headers.add("Content-Type","application/json")
    print(resp.headers)
    return resp