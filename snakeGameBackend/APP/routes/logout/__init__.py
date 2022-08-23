from flask import Blueprint,jsonify,request,make_response
from .logout import deauth_bp

logout_bp = Blueprint('logout',__name__,'/logout')

logout_bp.register_blueprint(deauth_bp)

# @logout_bp.route("/")#,methods=['POST'])
# @logout_bp.route("")#,methods=['POST'])
# def logout():
#     resp = make_response(jsonify(message="logging out"))
#     resp.status_code = 200
#     resp.headers.add("Content-Type","application/json")
#     return resp