from django.http import HttpResponse

import firebase_admin
import requests

from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
import json
import time
from ..firebase_auth.verification import verification

if not firebase_admin._apps:
    cred = credentials.Certificate("credit.json")
    firebase_admin.initialize_app(cred)



def initialize_client(request):
    try:
        auth_header = request.META.get("HTTP_AUTHORIZATION")

        test = verification.createVar(auth_header)
        print (test)

        if (test is None):
            return HttpResponse("The user doesn't exist", status = 400)

        y = json.dumps(test)

        return HttpResponse(y)

    except:
        return HttpResponse("No token provided", status = 401)


def visitor_ip_address(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')

    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def functionnalities(request):    
    x = {
    "customer": {
        "host":  str(visitor_ip_address(request))
    },
    "server": {
        "current_time": int(time.time()),
        "services": [{
            "name": "twitter",
            "widgets": [{
                "name": "profile",
                "description": "Display profile from twitter",
                "params": [{
                    "name": "city",
                    "type": "string"
                }],
            }]
        },
        {
            "name": "rss",
            "widgets": [{
                "name": "article_list",
                "description": "Displaying the list of the last articles",
                "params": [{
                    "name": "link",
                    "type": "string"
                }, {
                    "name": "number",
                    "type": "integer",
                    }]
                }],
        }],
        }
    },

    
    return HttpResponse(json.dumps(x))

def search(request):
    obj = str(request.GET)
    query = request.GET['query']
    message = "propriété GET : {} et requête : {}".format(obj, query)
    return HttpResponse(message)