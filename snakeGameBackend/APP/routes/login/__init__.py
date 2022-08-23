from flask import Blueprint
from .login import auth_bp

login_bp = Blueprint('login',__name__,url_prefix="/login")

login_bp.register_blueprint(auth_bp)