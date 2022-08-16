from flask import Blueprint, render_template

bp = Blueprint("home_article",__name__)

@bp.route('/article')
def home_article():
    return render_template("home.html")