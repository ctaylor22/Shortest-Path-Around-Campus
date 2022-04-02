# app.py
from flask import Flask, render_template
from Graph import Graph
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/')
def api():
    return "YAY"

app.run(debug=True)