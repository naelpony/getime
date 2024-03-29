from flask import Flask, request, jsonify, make_response, redirect, url_for, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from datetime import datetime
from flask_login import LoginManager, login_user, UserMixin, current_user, logout_user, login_required


app = Flask(__name__)
login_manager = LoginManager()
CORS(app)  
app.secret_key = 'super secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
db = SQLAlchemy(app)
login_manager.init_app(app)

class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), unique=False, nullable=False)
  sername = db.Column(db.String(120), unique=False, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(120), unique=False, nullable=False)
  role = db.Column(db.String(120), unique=False, nullable=True, default="User")
  status = db.Column(db.String(120), unique=False, nullable=True, default="Non-active")
  image = db.Column(db.String(120), unique=False, nullable=False, default="png.png")
  time = db.Column(db.String(120), unique=False, nullable=False, default=datetime.now().strftime("%H:%M:%S"))

  def json(self):
    return {
      'id': self.id, 
      'name': self.name, 
      'sername': self.sername, 
      'email': self.email, 
      'password': self.password,
      'role': self.role,
      'status': self.status,
      'image': self.image
      }
  
  def get_id(self):
    return str(self.email)
  def is_active(self):
    return True
  def is_authenticated(self):
    return True
  def is_anonymous(self):
    return False
  
  @login_manager.user_loader
  def load_user(email):
      dbb = User.query.filter_by(email=email).first()
      users = User(name = dbb.name, sername = dbb.sername, email = dbb.email)
      return users




class getTime(db.Model):
  __tablename__ = 'timers'
  id = db.Column(db.Integer, primary_key=True)
  userid = db.Column(db.Integer, db.ForeignKey('users.id'))
  startTime = db.Column(db.String(120), unique=True, nullable=False)
  
  def json(self):
    return {
      'id': self.id,
      'userid': self.userid,
      'startTime': self.startTime
    }

db.create_all()




# test route 
@app.route('/test', methods=['GET'])
def test():
  return redirect('http://localhost:3000/testApiCopy', code=302)

# create a user

@app.route('/api/user', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(name=data['name'], sername=data['sername'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
  
    return jsonify({
      'id': new_user.id,
      'name': new_user.name,
      'sername': new_user.sername,
      'email': new_user.sername,
      'password': new_user.password
    }), 201
    
  except Exception as e:
    return make_response(jsonify({'massege': 'Не получилось зарегестрироваться', 'error': str(e)}), 500)
  
# get all users
@app.route('/api/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{
      'id': user.id, 
      'name': user.name, 
      'sername': user.sername, 
      'email': user.email, 
      "password": user.password
      } for user in users]
    return jsonify(users_data), 200
  
  except Exception as e:
    return make_response(jsonify({'message': 'Не удалось получить пользователей', 'error': str(e)}), 500)
  


@app.route("/api/login", methods=['GET','POST'])
def login():
  try:
    data = request.get_json()
    emaill = data['email']
    passwordd = data['password']
    user = User.query.filter_by(email=emaill).first()
  
    if not user or not user.password == passwordd:
      return make_response(jsonify({'message': 'fuck gg'}))
    login_user(user=user, remember=True)

    return jsonify({
      'id': user.id,
      'name': user.name,
      'sername': user.sername,
      'email': user.sername,
    }), 200

  except Exception as e:
    return make_response(jsonify({'message': 'Not yet', 'error': str(e)}), 500)


@login_required
@app.route("/api/logout", methods=['GET'])
def rrrrr():
  try:
    f = current_user

    return make_response(jsonify(f.name))
  except Exception as e:
    return make_response(jsonify({'message': 'Not logout', 'error': str(e)}), 500)
