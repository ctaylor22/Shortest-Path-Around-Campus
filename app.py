# app.py
from flask import Flask, jsonify, render_template, request
from __future__ import print_function
from Graph import Graph
import sys

graph = Graph.load_from_json("GeorgeFoxCampus.json")
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/')
def api():
    req = request.args

    print(req, file=sys.stderr)
    shortest_path = graph.shortest_path_between(req['source'], req['destination'], bool(req['handicap']))
    path_len = graph.path_length(shortest_path)
    shortest_path.append(path_len)
    return jsonify(shortest_path), 200
    # return jsonify(shortest_path), 200