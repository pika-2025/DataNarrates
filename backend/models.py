from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

# 1. Create the SQLAlchemy "db" instance
db = SQLAlchemy()

# 2. Define the User model
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password: str):
        """
        Hashes `password` and stores it.
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """
        Returns True if `password` matches the stored hash.
        """
        return check_password_hash(self.password_hash, password)
