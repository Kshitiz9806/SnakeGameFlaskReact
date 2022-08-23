from flask import Blueprint
from .setscore import ss_bp

setscore_bp = Blueprint('setscore',__name__,url_prefix='/setscore')

setscore_bp.register_blueprint(ss_bp)
