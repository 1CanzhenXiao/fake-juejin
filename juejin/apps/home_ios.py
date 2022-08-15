from flask import Blueprint, render_template

bp = Blueprint("home_ios",__name__)

@bp.route('/ios')
def home_ios():
    return render_template("home.html")