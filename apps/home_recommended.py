from flask import Blueprint, render_template

bp = Blueprint("home_recommended",__name__)

@bp.route('/recommended')
def home_recommended():
    return render_template("home.html")