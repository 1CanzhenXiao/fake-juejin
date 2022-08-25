import os.path
from flask import Blueprint, render_template
import json

bp = Blueprint("article",__name__)
# 注意此为绝对路径，在不同的电脑上运行得注意
path1 = r"D:\git\juejin\static\resource\json\all_article_info.json"
path2 = r"D:\git\juejin\static\resource\json\all_user_info.json"

@bp.route('/<article_id>')
def article(article_id):
    
    with open(path1, 'r', encoding='utf-8') as f:
        articles_inf = json.load(f)
    with open(path2, 'r', encoding='utf-8') as f:
        users_inf = json.load(f)

    article_inf = articles_inf[article_id]
    user_id = article_inf["user_id"]
    user_inf = users_inf[user_id]
    return render_template("article.html", user_inf = user_inf, article_inf = article_inf, method = "post")