from flask import Flask, render_template
from apps.page_jump.home_android import bp as android_bp
from apps.page_jump.home_article import bp as article_bp
from apps.page_jump.home_backend import bp as backend_bp
from apps.page_jump.home_career import bp as career_bp
from apps.page_jump.home_following import bp as following_bp
from apps.page_jump.home_freebie import bp as freebie_bp
from apps.page_jump.home_recommended import bp as recommended_bp
from apps.page_jump.home_ai import bp as ai_bp
from apps.page_jump.home_ios import bp as ios_bp
from apps.page_jump.home_frontend import bp as frontend_bp

app = Flask(__name__)
app.register_blueprint(android_bp)
app.register_blueprint(article_bp)
app.register_blueprint(backend_bp)
app.register_blueprint(career_bp)
app.register_blueprint(following_bp)
app.register_blueprint(freebie_bp)
app.register_blueprint(frontend_bp)
app.register_blueprint(recommended_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(ios_bp)


@app.route('/')
def index():
    return render_template("home.html")

if __name__ == '__main__':
    app.run()
