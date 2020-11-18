from django.http import HttpResponse, JsonResponse


from rest_framework.response import Response
from rest_framework.decorators import api_view

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
        
        if (test is None):
            return HttpResponse("The user doesn't exist", status = 400)

        y = json.dumps(test)
        resp = json.loads(y)
    
        print(resp['displayName'])

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
                "name": "post",
                "description": "Post a tweet on twitter",
                "params": [{
                    "textTweet": "text",
                    "type": "string"
                }],
            }, {
                "name": "timeline",
                "description": "Get your timeline on twitter",
                "params": [{}]
                },
                {
                "name": "search",
                "description": "Search some tweets on twitter",
                "params": [{
                    "Hashtag": "researchTag",
                    "type": "string"
                }]
                }],
        },
        {
            "name": "spotify",
            "widgets": [{
                "name": "tracks",
                "description": "Get your top tracks on spotify",
                "params": [{}],
            }, {
                "name": "profile",
                "description": "Get your profile on spotify",
                "params": [{}]
                },
                {
                "name": "playlists",
                "description": "Get your playlists on spotify",
                "params": [{}]
                }],
        },
        {
            "name": "trello",
            "widgets": [{
                "name": "boards",
                "description": "Get your boards on trello",
                "params": [{}],
            }, {
                "name": "cards",
                "description": "Get your cards of a board on trello",
                "params": [{
                    "Board": "id",
                    "type": "string"
                }]
                },
                {
                "name": "members",
                "description": "Get the members of a board on trello",
                "params": [{
                    "Board": "id",
                    "type": "string"
                }]
                }],
        },
        {
            "name": "twitch",
            "widgets": [{
                "name": "profile",
                "description": "Get your profile on twitch",
                "params": [{}],
            }, {
                "name": "subscribed",
                "description": "Get your subscribed channels on twitch",
                "params": [{}]
                },
                {
                "name": "search",
                "description": "Search info about a channel on twitch",
                "params": [{
                    "Channel": "name",
                    "type": "string"
                }]
                },
                {
                "name": "Top Games",
                "description": "Get Top Games on Twitch",
                "params": [{}]
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
"""

"""
@api_view(['GET'])
def index(request):
    responseData = {
        'id': 4,
        'name': 'Test Response',
        'roles' : ['Admin','User']
    }

    return Response(responseData)

"""

"""
@api_view(['POST'])
def test_post(request):

    return Response(request.data)
