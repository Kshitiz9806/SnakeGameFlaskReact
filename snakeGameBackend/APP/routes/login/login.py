from flask import Blueprint, jsonify,request,make_response
from flask_cors import cross_origin
from ...models import User
from ...utils import JWT
#from ....model import

auth_bp = Blueprint('auth',__name__,url_prefix="/auth")

@auth_bp.route("/",methods=['POST'])
@auth_bp.route("",methods=['POST'])
#uncomment these for actual deployment
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    username = data.get("username")
    print(data)

    user =  User.query.filter_by(username=username).first()
    if not user:
        resp = make_response((jsonify(message="username invalid")))
        resp.headers.add("Content-Type","application/json")
        resp.status_code = 401
        return resp
    
    password = data.get("password")
    if user.password != password:
        resp = make_response((jsonify(message="wrong password")))
        resp.headers.add("Content-Type","application/json")
        resp.status_code = 401
        return resp
    # #remove token for actual deployment
    token = JWT.tokenizer({"username":username,"password":password})
    resp = make_response(jsonify({"message":"user authenticated","token":str(token,'UTF-8')}))
    #resp.set_cookie('token',token,httponly=True,samesite=None)
    resp.headers.add("Content-Type","application/json")
    print(resp.headers)
    return resp