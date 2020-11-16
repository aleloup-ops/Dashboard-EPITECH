from django.http import HttpResponse, JsonResponse


from rest_framework.response import Response
from rest_framework.decorators import api_view

import firebase_admin

from firebase_admin import auth
from firebase_admin import credentials

cred = credentials.Certificate("credit.json")

firebase_admin.initialize_app(cred)

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