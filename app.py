# app.py
from flask import Flask, jsonify, render_template, request
from Graph import Graph

graph = Graph.load_from_json("GeorgeFoxCampus.json")
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/')
def api():
    req = request.args
    return jsonify({"route" : graph.shortest_path_between(req['source'], req['destination'])}), 200