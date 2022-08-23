from flask import Blueprint,jsonify,request,make_response
from flask_cors import cross_origin

deauth_bp = Blueprint('deauth',__name__,url_prefix='/deauth')

@deauth_bp.route("/",methods=['POST'])
@deauth_bp.route("",methods=['POST'])
#uncomment these for actual deployment
@cross_origin(supports_credentials=True)
def logout():
    #token = request.cookies.get('token')
    resp = make_response(jsonify(message="logging out"))
    #resp.delete_cookie('token')
    resp.status_code = 200
    resp.headers.add("Content-Type","application/json")
    return resp