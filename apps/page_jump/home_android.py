from flask import Blueprint, render_template

bp = Blueprint("home_android",__name__)

@bp.route('/android')
def home_android():
    return render_template("home_android.html")