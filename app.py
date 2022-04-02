# app.py
from flask import Flask, jsonify, render_template, request
from Graph import Graph
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/')
def api():
    return jsonify({"Yay" : "YAY"}), 200