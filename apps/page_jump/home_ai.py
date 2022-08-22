from flask import Blueprint, render_template

bp = Blueprint("home_ai",__name__)

@bp.route('/ai/')
def home_ai():
    return render_template("home_ai.html")