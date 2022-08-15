from flask import Blueprint, render_template

bp = Blueprint("lives",__name__)

@bp.route('/lives')
def lives():
    return render_template("lives.html")