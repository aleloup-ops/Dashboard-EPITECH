from django.http import HttpResponse

import firebase_admin
import requests

from firebase_admin import auth
from firebase_admin import credentials

if not firebase_admin._apps:
    cred = credentials.Certificate("credit.json")
    firebase_admin.initialize_app(cred)

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


def search(request):
    obj = str(request.GET)
    query = request.GET['query']
    message = "propriété GET : {} et requête : {}".format(obj, query)
    return HttpResponse(message)