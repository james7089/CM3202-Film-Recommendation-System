from flask import Flask, render_template
from waitress import serve
from flask_restful import Resource, Api, reqparse
import numpy as np

app = Flask(__name__)
api = Api(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')

if __name__ ==  '__main__':
      serve(app, host='0.0.0.0', port=8000)