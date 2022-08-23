from flask import Blueprint, render_template

bp = Blueprint("index",__name__)

@bp.route('/index')
def home_ai():
    return render_template("index.html")