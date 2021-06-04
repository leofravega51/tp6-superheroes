from flask import Flask, jsonify
from db.connection import superheroes_db
from functions.functions import getSuperheros, getSuperherosByHouse, updateSuperhero, restartDatabase, searchById, deleteCharacter
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/', methods=["GET"])
def getAllSuperheros():
    """Obtenemos todos los superheroes y retornamos en formato json"""
    superheros = getSuperheros()

    return jsonify(superheros)

@app.route('/marvel', methods=["GET"])
def marvelSuperheros():
    """Retornamos los superheroes de la casa Marvel"""
    superheros = getSuperherosByHouse('MARVEL')

    return jsonify(superheros)

@app.route('/dc', methods=["GET"])
def dcSuperheros():
    """Retornamos los superheroes de la casa DC"""
    superheros = getSuperherosByHouse('DC')

    return jsonify(superheros)

@app.route('/search/<id>', methods=["GET"])
def searchSuperhero(id):
    """Buscamos los datos del superheroe por su id"""
    superhero_data = searchById(id)

    return jsonify(superhero_data)


@app.route('/superhero/modify', methods=["POST"])
def modifySuperhero():
    """Modificamos los datos de un superheroe"""

    response = updateSuperhero(request.res['data'])

    return response

@app.route('/superhero/delete/<id>', methods=["GET"])
def deleteSuperhero(id):
    """Eliminamos un superheroe mediante su id"""
    
    response = deleteCharacter(id)

    return jsonify(response)

# @app.before_first_request
# def before_first_request():
#     """Reinicio de base de datos"""
#     response = restartDatabase()
#     return response

if __name__ == "__main__":
    app.run(host='backend', port='5000', debug=True)
