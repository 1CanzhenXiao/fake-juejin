from flask import Blueprint, render_template

bp = Blueprint("pins",__name__)

@bp.route('/pins')
def pins():
    return render_template("pins.html")