from flask import Blueprint,request,jsonify,make_response
from sqlalchemy import func
from ...models import User
from ...models import db
from ...utils import JWT

userinfo_bp = Blueprint('userinfo',__name__,url_prefix='/userinfo')

@userinfo_bp.route("/")
@userinfo_bp.route("")
def userinfo():
    token = request.cookies.get("token")
    user = JWT.validator(token)
    if not user:
        resp = make_response((jsonify(message="incorrect request")))
        resp.headers.add("Content-Type","application/json")
        resp.status_code = 401
        return resp

    resp = make_response(jsonify({"username":user.username,"maxscore":user.maxscore}))
    resp.headers.add("Content-Type","application/json")
    return resp
