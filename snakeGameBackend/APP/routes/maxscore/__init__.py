from flask import Blueprint
from .maxscore import mxscore_bp

score_bp = Blueprint('score',__name__,url_prefix='/score')

score_bp.register_blueprint(mxscore_bp)
