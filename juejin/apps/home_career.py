from flask import Blueprint, render_template

bp = Blueprint("home_career",__name__)

@bp.route('/career')
def home_career():
    return render_template("home.html")