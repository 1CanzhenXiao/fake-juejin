from flask import Blueprint, render_template

bp = Blueprint("home_freebie",__name__)

@bp.route('/freebie')
def home_freebie():
    return render_template("home_freebie.html")