from flask import Blueprint, render_template
import json

bp = Blueprint("article",__name__)

@bp.route('/<id>')
def article(id):
    with open(r"D:\git\juejin\static\resource\json\all_user_info.json", 'r', encoding='utf-8') as f:
        users_inf = json.load(f)
    user_inf = users_inf[id]
    return render_template("article.html", user_inf = user_inf, method = "post")