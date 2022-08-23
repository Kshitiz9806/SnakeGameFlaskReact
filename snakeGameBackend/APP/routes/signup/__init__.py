from flask import Blueprint
from .signup import sup_bp

signup_bp = Blueprint('signup',__name__,url_prefix="/signup")

signup_bp.register_blueprint(sup_bp)