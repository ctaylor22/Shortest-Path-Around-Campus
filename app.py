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
    shortest_path = graph.shortest_path_between(req['source'], req['destination'])
    path_len = graph.path_length(shortest_path)
    return jsonify(shortest_path.append(path_len)), 200
    # return jsonify(shortest_path), 200