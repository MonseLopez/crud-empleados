from flask import Flask
from models.database import db
from flask_migrate import Migrate
from config import Config
from routes.empleados import empleados_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    db = SQLAlchemy(app)
    app.config.from_object(Config)
    db.init_app(app)

    # Inicializar Flask-Migrate
    migrate = Migrate(app, db)

    # Registrar el Blueprint
    app.register_blueprint(empleados_bp, url_prefix='/empleados')

    return app

app = create_app()
