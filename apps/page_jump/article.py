from flask import Blueprint, render_template

bp = Blueprint("article",__name__)

@bp.route('/<id>')
def article(id):
    return render_template("article.html")