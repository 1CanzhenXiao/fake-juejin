from flask import Blueprint, render_template

bp = Blueprint("course",__name__)

@bp.route('/courses')
def courses():
    return render_template("courses.html")