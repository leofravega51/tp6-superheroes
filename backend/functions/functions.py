import requests
from flask import jsonify, json
from db.connection import superheroes_db
from bson.objectid import ObjectId



def getSuperheros():
    """Traemos todos los superheroes de la base de datos"""
    
    documentos = superheroes_db.personajes.find({})
    superheros = []
    for dato in documentos:
        datos = dato
        datos['_id'] = str(datos['_id'])
        superheros.append(datos)

    return superheros


def getSuperherosByHouse(house):
    """Obtenemos solo los superheroes de la casa Marvel"""

    documentos = superheroes_db.personajes.find({'house': house})

    superheros = []
    for dato in documentos:
        datos = dato
        datos['_id'] = str(datos['_id'])
        superheros.append(datos)

    return superheros

def searchById(id):
    """Obtenemos los datos de un superheroe por su nombre"""
    documentos = superheroes_db.personajes.find({'_id': ObjectId(id)})
    superhero_data = []
    for dato in documentos:
        datos = dato
        datos['_id'] = str(datos['_id'])
        superhero_data.append(datos)

    return superhero_data


def updateSuperhero(id):
    """Agregamos un super heroe con sus respectivos datos"""

    data = list(superheroes_db.personajes.find({'_id': ObjectId(id)}, {'_id': 0}))

    superheroes_db.personajes.update_one({"_id":ObjectId(id)}, {"$set": data})


def deleteCharacter(id):
    """Eliminamos un personaje mediante su id"""

    superheroes_db.personajes.delete_one({'_id':ObjectId(id)})

    return "Delete OK"


def restartDatabase():
    """Reinicializamos la base de datos"""
    try:
        #Eliminamos todas las colecciones existentes en la bbdd
        superheroes_db.personajes.drop()

        #Obtenemos los datos de un json y los insertamos en la bbdd
        sh = open('static/superheroes.json')
        heros_list = json.load(sh)

        for h in heros_list:
            superheroes_db.personajes.insert_one(h)

        return "Restart OK"
    except:
        raise
