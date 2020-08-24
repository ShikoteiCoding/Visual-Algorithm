#from __future__ import print_function
#from flask import Flask, render_template, make_response
#from flask import redirect, request, jsonify, url_for

from flask import Flask, render_template, redirect, url_for
import os

app = Flask(__name__)

app._static_folder = os.path.abspath("templates/static/")

sorting_algorithm = ['BubbleSort', 'Quicksort']

@app.route('/home')
def home():
    return render_template('layout/home.html')

@app.route('/sorting')
def sorting():
    return render_template('layout/sorting.html', active='sorting', len = len(sorting_algorithm), algorithms = sorting_algorithm)

@app.route('/pathfinding')
def pathfinding():
    return render_template('layout/pathfinding.html', active='pathfinding')

@app.route('/about')
def about():
    return render_template('layout/about.html', active='about')

@app.route('/<name>')
def random_url(name):
    return '<h1>Page not found<h1>'

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5050)
