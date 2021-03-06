from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

import json

from firebase_admin import auth
from firebase_admin import firestore

db = firestore.client()

# Create your views here.

"""
    @ POST
"""
@api_view(['POST'])
def index(request):

    credential = {
        'accessToken': '',
        'secret': '',
    }

    if 'credential' in request.data:
        credential['accessToken'] = request.data['credential']['accessToken']
        credential['secret'] = request.data['credential']['secret']

    data = {
        u'uid': request.data['uid'],
        u'email': request.data['email'],
        u'displayName': request.data['displayName'],
        u'trelloToken': "",
        u'twitchToken': "",
        u'spotifyToken': "",
        u'twitterToken': credential['accessToken'],
        u'twitterSecretToken': credential['secret']
    }

    doc_ref = db.collection(u'users').document(request.data['uid'])
    doc_ref.set(data, merge=True)

    widget_ref = db.collection(u'widgets').document(request.data['uid'])
    widget_ref.set({}, merge=True)

    return JsonResponse({'status': 'OK'}, status=status.HTTP_200_OK)

"""
    @ GET
"""
@api_view(['GET'])
def get_user(request, user_id):

    user = auth.get_user(user_id)

    data = {
        'uid': user.uid,
        'email': user.email,
        'displayName': user.display_name
    }

    return JsonResponse(data, status=status.HTTP_200_OK)