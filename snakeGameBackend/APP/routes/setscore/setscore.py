from flask import Blueprint, jsonify,request,make_response
from sqlalchemy import func
from flask_cors import cross_origin
from ...models import User
from ...utils import JWT
from ...models import db
#from ....model import

ss_bp = Blueprint('ss',__name__,url_prefix="/ss")

@ss_bp.route("/",methods=['POST'])
@ss_bp.route("",methods=['POST'])
#uncomment these for actual deployment
@cross_origin(supports_credentials=True)
def setscore():
    data = request.get_json()
    token = data.get("token")
    user = JWT.validator(token)
    if not user:
        resp = make_response((jsonify(message="incorrect request")))
        resp.headers.add("Content-Type","application/json")
        resp.status_code = 401
        return resp
    newscore = data.get("score")
    user = db.session.query(User).filter(User.username == user.username).first()
    if newscore>user.maxscore:
        user.maxscore = newscore
        db.session.commit()

    amscore = db.session.query(func.max(User.maxscore)).scalar()
    username = db.session.query(User).filter(User.maxscore == amscore).first().username
    if(user.maxscore == amscore):
        username = user.username 

    resp = make_response(jsonify({"username":username,"maxscore":amscore}))
    resp.headers.add("Content-Type","application/json")
    return resp