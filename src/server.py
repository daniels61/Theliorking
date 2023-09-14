import datetime
from flask_cors import CORS 
from flask import Flask, request, abort, make_response, sessions
#from settings import dbpwd
import mysql.connector as mysql
import json
import uuid
import bcrypt
import mysql.connector, mysql.connector.pooling

pool = mysql.connector.pooling.MySQLConnectionPool(
    host = "localhost",
    user = "root",
    passwd = "123123123",
    database = "blog",
    buffered = True,
    pool_size = 7,
    pool_name = "mypool"
)

app = Flask(__name__)
CORS(app,supports_credentials=True,origins=["http://localhost:3000", "http://127.0.0.1:5000"], expose_headers='Set-Cookie')

@app.route('/loginStatus', methods=['POST'])
def login_status():
	data = request.get_json()
	query = "select user_id from sessions where session_id = %s"
	values = (data['cookie'].split('=')[1], )
	if values:
		cursor, db = excute_sql_query(query, values)
		record = cursor.fetchone()
		close_resources(cursor, db)

		if record:
			return {"status": "success", "message": "Logged in", "user_id": record[0]}

	return {"status": "error", "message": "Not logged in"}

@app.route('/logout', methods=['POST'])
def logout():
	query = "delete from sessions where session_id = %s"
	values = (request.cookies.get('session_id'), )
	cursor, db = commit_sql_query(query, values)
	close_resources(cursor, db)
	resp = make_response()
	session_id = ''
	resp.set_cookie("session_id", session_id, path="/", samesite='None', secure=True, expires=0)
	return resp

@app.route('/register', methods=['POST'])
def register():
	data = request.get_json()
	query = "select username from users where username = %s"
	values = (data['user'], )
	cursor ,db = excute_sql_query(query, values)
	record = cursor.fetchone()
	close_resources(cursor, db)

	if record == None: ## if username is not in the database
		query = "insert into users (username, password, email, created_at) values (%s, %s, %s, %s)"
		pwd = data['pass']
		hashed_pwd = bcrypt.hashpw(pwd.encode('utf-8'), bcrypt.gensalt())
		values = (data['user'], hashed_pwd, data['email'], create_time_stamp())
		cursor, db = commit_sql_query(query, values)
		close_resources(cursor, db)
	else:
		abort(401, 'user exists')

	resp = make_response()
	return resp

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	query = "select id, username, password from users where username = %s"
	values = (data['user'], )
	cursor, db = excute_sql_query(query, values)
	record = cursor.fetchone()
	close_resources(cursor, db)

	if not record:		
		abort(401, 'user doesnt exists')

	user_id = record[0]
	hashed_pwd = record[2].encode('utf-8')

	if bcrypt.hashpw(data['pass'].encode('utf-8'), hashed_pwd) != hashed_pwd:
		abort(401, 'wrong password')

	query = "insert into sessions (user_id, session_id) values (%s, %s)"
	session_id = str(uuid.uuid4())
	values = (user_id, session_id)
	cursor, db = commit_sql_query(query, values)
	close_resources(cursor, db)
	resp = make_response()
	resp.set_cookie("session_id", session_id, path="/", samesite='None', secure=True)
	return resp

@app.route('/posts', methods=['GET'])
def get_all_posts():
	db = pool.get_connection()
	query = "select id, title, content, user_id, created_at, username from posts"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['id', 'title', 'text', 'user_id', 'date', 'user_name']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
		data.reverse()
	return json.dumps(data)

@app.route('/postComments', methods=['POST'])
def get_post_comments():
	data = request.get_json()
	query = "select content, user_id, post_id, title, created_at, username from comments where post_id = %s"
	values = (data['postId'], )
	cursor, db = excute_sql_query(query, values)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['content', 'user_id', 'post_id', 'title', 'date', 'username']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)
	
@app.route('/newpost', methods=['POST'])
def add_post():
	data = request.get_json()

	if data['cookie'] == "":
		abort(401, 'You need to be logged in')

	query = "insert into posts (title, content, user_id, username, created_at, last_update) values (%s, %s, %s, %s, %s, %s)"
	cookie = data['cookie'].split('=')[1]
	user_id = get_userid_from_cookie(cookie)
	user_name = get_username_from_userid(user_id)
	current_time = create_time_stamp()
	values = (data['title'], data['text'], user_id, user_name , current_time, current_time)
	cursor, db = commit_sql_query(query, values)
	new_post_id = cursor.lastrowid
	close_resources(cursor, db)
	return get_post(new_post_id)

@app.route('/addComment', methods=['POST'])
def add_comment():
	data = request.get_json()

	if data['cookie'] == "":
		abort(401, 'You need to be logged in')

	query = "insert into comments (title, content, user_id, post_id, created_at, username) values (%s, %s, %s, %s, %s, %s)"
	cookie = data['cookie'].split('=')[1]
	user_id = get_userid_from_cookie(cookie)
	current_time = create_time_stamp()
	user_name = get_username_from_userid(user_id)
	values = (data['commentTitle'], data['commentText'], user_id, data['postId'] , current_time, user_name)
	cursor, db = commit_sql_query(query, values)
	new_post_id = cursor.lastrowid
	close_resources(cursor, db)
	return get_post(new_post_id)

@app.route('/userPosts', methods=['POST'])
def get_user_posts():
	data = request.get_json()
	user_id = get_userid_from_cookie(data['cookie'].split('=')[1])
	query = "select id, title, content, user_id, username, created_at from posts where user_id = %s"
	values = (user_id, )
	cursor, db = excute_sql_query(query, values)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['id', 'title', 'text', 'user_id', 'username', 'date']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
		data.reverse()
	return json.dumps(data)

@app.route('/userComments', methods=['POST'])
def get_user_comments():
	data = request.get_json()
	user_id = get_userid_from_cookie(data['cookie'].split('=')[1])
	query = "select id, content, title from comments where user_id = %s"
	values = (user_id, )
	cursor, db = excute_sql_query(query, values)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['id', 'content', 'title']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)

@app.route('/deleteUserPost', methods=['POST'])
def delete_user_post():
	data = request.get_json()
	query = "delete from posts where id = %s"
	values = (data['postId'], )
	cursor, db = commit_sql_query(query, values)
	close_resources(cursor, db)
	resp = make_response()
	return resp

@app.route('/editUserPost', methods=['POST'])
def edit_user_post():
	data = request.get_json()
	query = "update posts set title=%s, content=%s, last_update=%s where id = %s"
	values = (data['postTitle'], data['postText'], create_time_stamp() , data['postId'])
	cursor, db = commit_sql_query(query, values)
	close_resources(cursor, db)
	resp = make_response()
	return resp

@app.route('/latestsPosts', methods=['GET'])
def get_latests_posts():
	db = pool.get_connection()
	query = "select id, title from posts order by id desc limit 3"
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['id', 'title']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)

@app.route('/popularPosts', methods=['GET'])
def get_popular_posts():
	db = pool.get_connection()
	query = '''select post_id, count(*) as like_count from likes group by post_id order by
	like_count desc limit 3'''
	cursor = db.cursor()
	cursor.execute(query)
	records = cursor.fetchall()
	close_resources(cursor, db)
	posts_ids = [record[0] for record in records]
	query = "select id, title from posts where id in (%s, %s, %s)"
	values = (posts_ids[0], posts_ids[1], posts_ids[2])
	cursor, db = excute_sql_query(query, values)
	records = cursor.fetchall()
	close_resources(cursor, db)
	header = ['id', 'title']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
	return json.dumps(data)

@app.route('/like', methods=['POST'])
def like_post():
	data = request.get_json()

	if data['cookie'] == "":
		abort(401, 'You need to be logged in to like a post')

	query = "insert into likes (post_id, user_id, username) values (%s, %s, %s)"
	user_id = get_userid_from_cookie(data['cookie'].split('=')[1])
	user_name = get_username_from_userid(user_id)
	post_id = data['postId']

	if user_liked_post(user_id, post_id):
		return make_response("user already liked the post")

	values = (post_id, user_id, user_name)
	cursor, db = commit_sql_query(query, values)
	close_resources(cursor, db)
	resp = make_response()
	return resp

@app.route('/searchPosts', methods=['POST'])
def search_posts():
	data = request.get_json()
	search_term = "%" + str(data['searchTerm']) + "%"
	query = '''select id, title, content, user_id, username, created_at from posts where
			title like %s or content like %s'''
	values = (search_term, search_term)
	cursor, db = excute_sql_query(query, values)
	records = cursor.fetchall()
	close_resources(cursor, db)	

	if records == None:
		return {"status": "error", "message": "No posts found"}
	
	header = ['id', 'title', 'text', 'user_id', 'username', 'date']
	data = []
	for r in records:
		data.append(dict(zip(header, r)))
		data.reverse()
	return json.dumps(data)	

def user_liked_post(user_id, post_id):
	query = "select user_id from likes where (user_id = %s and post_id = %s)"
	values = (user_id, post_id)
	cursor, db = excute_sql_query(query, values)
	res = cursor.fetchone()
	close_resources(cursor, db)

	if res == None:
		return False
	
	return True

def create_time_stamp():
	current_date = str(datetime.datetime.now())
	index_of_dot = current_date.find(".")
	return current_date[:index_of_dot]

def get_userid_from_cookie(cookie):
	query = "select user_id from sessions where session_id = %s"
	values = (cookie, )
	cursor, db = excute_sql_query(query, values)
	record = cursor.fetchone()
	close_resources(cursor, db)
	return record[0]

def get_username_from_userid(user_id):
	query = "select username from users where id = %s"
	values = (user_id, )
	cursor, db = excute_sql_query(query, values)
	record = cursor.fetchone()
	close_resources(cursor, db)
	return record[0]

def get_post(id):
	query = "select title, content from posts where id = %s"
	values = (id,)
	cursor, db = excute_sql_query(query, values)
	record = cursor.fetchone()
	close_resources(cursor, db)
	header = ['id', 'title', 'content']
	return json.dumps(dict(zip(header, record)))	

def excute_sql_query(query, values):
	db = pool.get_connection()
	cursor = db.cursor()
	cursor.execute(query, values)
	return cursor, db

def commit_sql_query(query, values):
	db = pool.get_connection()
	cursor = db.cursor()
	cursor.execute(query, values)
	db.commit()
	return cursor, db

def close_resources(cursor, db):
	cursor.close()
	db.close()

if __name__ == "__main__":
	app.run()
	