from flask import Blueprint, render_template

bp = Blueprint("home_backend",__name__)

@bp.route('/backend')
def home_backend():
    return render_template("home_backend.html")