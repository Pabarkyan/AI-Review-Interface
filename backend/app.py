from flask import Flask, jsonify
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv() 
app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify(message="Hello, World!")

@app.route('/api/test', methods=['GET'])
def test_connection():
    return jsonify({"message": "Connection successful!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
