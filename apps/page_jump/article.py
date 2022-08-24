from flask import Blueprint, render_template
import json

bp = Blueprint("article",__name__)

@bp.route('/<article_id>')
def article(article_id):
    with open(r"D:\git\juejin\static\resource\json\all_article_info.json", 'r', encoding='utf-8') as f:
        articles_inf = json.load(f)
    with open(r"D:\git\juejin\static\resource\json\all_user_info.json", 'r', encoding='utf-8') as f:
        users_inf = json.load(f)

    article_inf = articles_inf[article_id]
    user_id = article_inf["user_id"]
    user_inf = users_inf[user_id]
    return render_template("article.html", user_inf = user_inf, article_inf = article_inf, method = "post")