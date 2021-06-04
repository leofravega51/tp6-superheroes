from pymongo import MongoClient

def connection(host, port, database):
    try:
        client = MongoClient(host, port)
        db = client.get_database(database)
        return db
    except:
        raise

superheroes_db = connection('superheroes-db', 27017, 'superheroes')


