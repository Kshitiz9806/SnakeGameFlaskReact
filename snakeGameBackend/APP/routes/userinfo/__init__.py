from flask import Blueprint,request,jsonify,make_response
from .userinfo import userinfo_bp


uinfo_bp = Blueprint('uinfo', __name__ , "/uinfo")
uinfo_bp.register_blueprint(userinfo_bp)