from django.http import HttpResponse

import firebase_admin

from firebase_admin import auth
from firebase_admin import credentials

cred = credentials.Certificate("credit.json")

firebase_admin.initialize_app(cred)

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")