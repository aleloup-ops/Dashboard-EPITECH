from django.http import HttpResponse

import firebase_admin

from firebase_admin import auth
from firebase_admin import credentials

cred = credentials.Certificate("credit.json")

firebase_admin.initialize_app(cred)

user = auth.get_user('of9mSupELZOTGNS6SAiA2CF9k5v2')
print('Successfully fetched user data: {0}'.format(user.email))

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")