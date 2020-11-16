from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore

class verification():

    def userExist(uid):
        db = firestore.client()
        users_ref = db.collection(u'users').document(uid)
        doc = users_ref.get()

        if doc.exists:
            return True
        else:
            return False

    def fillTwitterFirebase(uid, twitterToken, twitterSecretToken):
        db = firestore.client()
        users_ref = db.collection(u'users').document(uid)
        doc = users_ref.get()

        if doc.exists:
            test = doc.to_dict()
            users_ref.update({"twitterToken": twitterToken})
            users_ref.update({"twitterSecretToken": twitterSecretToken})

    def createVar(uid):
        varToCreate = ['widgets', 'services', 'twitterToken', 'twitterSecretToken', 'twitchToken', 'spotifyToken', 'trelloToken']

        db = firestore.client()
        users_ref = db.collection(u'users').document(uid)
        doc = users_ref.get()

        if doc.exists:
            test = doc.to_dict()
            for var in varToCreate:
                if var not in test:
                    users_ref.update({var: "null"})
        else:
            if (uid):
                return None
        return test