from flask import Flask, session, jsonify, request
from models import db, User
from flask_cors import CORS

# 1. Create & configure the Flask app
app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000"],
    supports_credentials=True,
    methods=["GET","POST","OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    expose_headers={"Set-Cookie"}
)

app.secret_key = "piyush"               # Used to sign session cookies
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False        # Disable warning

# 2. Initialize SQLAlchemy with this app
db.init_app(app)

# 3. Create tables if they don't exist yet
with app.app_context():
    db.create_all()

# 4. Simple test route to verify sessions
@app.route("/")
def index():
    visits = session.get("visits", 0) + 1
    session["visits"] = visits
    return jsonify(visits=visits)

# 5. Registration endpoint
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify(message="Name, email, and password are required"), 400

    if User.query.filter_by(email=email).first():
        return jsonify(message="Email already registered"), 400

    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify(message="User registered"), 201

# 6. Login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify(message="Invalid credentials"), 401

    session["user_id"] = user.id
    return jsonify(message="Logged in"), 200


@app.route("/check-auth")
def check_auth():
    user_id = session.get("user_id")
    return jsonify(logged_in=user_id is not None), 200

@app.route("/user")
def get_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify(error="Unauthorized"), 401
        
    user = User.query.get(user_id)
    return jsonify(name=user.name, email=user.email)



# 7. Logout endpoint
@app.route("/logout", methods=["POST"])
def logout():
    # Remove user_id from the session
    session.pop("user_id", None)
    return jsonify(message="Logged out successfully"), 200


if __name__ == "__main__":
    app.run(debug=True)
