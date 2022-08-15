from flask import Blueprint, render_template

# 名字可以随便取（第一个参数就是蓝图的名字）
bp = Blueprint("events",__name__)

# 获取该蓝图的url
# url_for(蓝图名称+“.”+蓝图回调函数名)
@bp.route('/events')
def events():
    return render_template("events.html")