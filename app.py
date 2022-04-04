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
    # Gets requests from the javascript file and seperates it into source, destination, and handicap to pass inot Djikstras
    req = request.args

    # Runs Djikstra's
    shortest_path = graph.shortest_path_between(req['source'], req['destination'], req['handicap'] == "true")

    # Gets the path length of the shortest path
    path_len = graph.path_length(shortest_path)

    # Appends the path length to shortest path to send back to javascript
    shortest_path.append(path_len)

    # jsonify's shortest path and path length and returns the request with status 200
    return jsonify(shortest_path), 200