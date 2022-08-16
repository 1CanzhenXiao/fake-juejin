from flask import Blueprint, render_template

bp = Blueprint("home_frontend",__name__)

@bp.route('/frontend')
def home_frontend():
    return render_template("home.html")