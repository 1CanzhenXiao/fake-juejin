from flask import Blueprint, render_template

bp = Blueprint("home_following",__name__)

@bp.route('/following')
def home_following():
    return render_template("home_following.html")