from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy, now
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)  
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(120), unique=False, nullable=False)
  sername = db.Column(db.String(120), unique=False, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(120), unique=False, nullable=False)
  role = db.Column(db.String(120), unique=False, nullable=True, default="User")
  status = db.Column(db.String(120), unique=False, nullable=True, default="Non-active")
  image = db.Column(db.String(120), unique=False, nullable=False, default="png.png")
  time = db.Column(db.String(120), unique=False, nullable=False, default=now())

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

class getTime(db.Model):
  __tablename__ = 'timers'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  startTime = db.Column(db.String(120), unique=True, nullable=False)
  
  def json(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'startTime': self.startTime
    }

db.create_all()


# test route 
@app.route('/test', methods=['GET'])
def test():
  return jsonify({'message': 'Этот сервер работает'})

# create a user

@app.route('/users', methods=['POST'])
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
@app.route('/users', methods=['GET'])
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
  
