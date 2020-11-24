from django.shortcuts import render
import requests
from django.http import HttpResponse
from django.shortcuts import redirect
from ..firebase_auth.verification import verification
from rest_framework.decorators import api_view
import os
import json

TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token"
CLIENT_SIDE_URL = "http://localhost"
PORT = 8080
REDIRECT_URI = "{}:{}/twitch/callback/q".format(CLIENT_SIDE_URL, PORT)
client_key = os.environ.get('twitchKeyClient')
client_secret = os.environ.get('twitchKeyClientSecret')
uid = ''

def login(request, user_uid):
    global uid
    uid = user_uid

    print('UID ' + user_uid)

    x = redirect("https://id.twitch.tv/oauth2/authorize?client_id=8508od1jvg7mj4c1glehzmp24myczz&response_type=code&redirect_uri=" + REDIRECT_URI + "&scope=viewing_activity_read")
    return (x)

def callback(request):
    auth_token = request.GET.get('code')

    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': client_key,
        'client_secret': client_secret,
    }

    post_request = requests.post(TWITCH_TOKEN_URL, data=code_payload)
    verification.updateValueFirebase(uid, "twitchToken", str(post_request.json().get('access_token')))

    return redirect("http://localhost:4200/widgets")

def getProfile(request):
    try:
        uid = request.META.get("HTTP_AUTHORIZATION")

        if (verification.userExist(uid) == False):
            return HttpResponse("The user doesn't exist", status = 400)

        test = verification.getValues(uid)

        y = json.dumps(test)
        resp = json.loads(y)

        if (test == None):
            return HttpResponse("The user doesn't exist", status=400)

        head = {
            'Client-Id': client_key,
            'Authorization': 'Bearer ' + resp['twitchToken'],
        }
        #first request
        getInfo = requests.get("https://api.twitch.tv/helix/users", headers=head)

        return HttpResponse(getInfo)

    except:
        return HttpResponse("No token provided", status = 401)

def getFollowers(request):
    try:
        uid = request.META.get("HTTP_AUTHORIZATION")
        if (verification.userExist(uid) == False):
            return HttpResponse("The user doesn't exist", status = 400)

        userInfos = verification.getValues(uid)

        y = json.dumps(userInfos)
        resp = json.loads(y)

        head = {
            'Client-Id': client_key,
            'Authorization': 'Bearer ' + resp['twitchToken'],
        }

        getInfo = requests.get("https://api.twitch.tv/helix/users", headers=head)
        getInfoJson = getInfo.json()

        getInfo = requests.get("https://api.twitch.tv/helix/users/follows?from_id=" + getInfoJson.get("data")[0]["id"], headers=head)

        return HttpResponse(getInfo)

    except:
        return HttpResponse("No token provided", status = 401)
#
@api_view(['POST'])
def searchChannel(request):
    try:
        searchName = request.data['channel']

        if (searchName == None or searchName == ""):
            return HttpResponse("Write a channel to search on twitch le s", status = 400)

        
        uid = request.META.get("HTTP_AUTHORIZATION")
        if (verification.userExist(uid) == False):
            return HttpResponse("The user doesn't exist", status = 400)

        userInfos = verification.getValues(uid)

        y = json.dumps(userInfos)
        resp = json.loads(y)

        head = {
            'Client-Id': client_key,
            'Authorization': 'Bearer ' + resp['twitchToken'],
        }

        getInfo = requests.get("https://api.twitch.tv/helix/search/channels?query=" + searchName, headers=head)
        return HttpResponse(getInfo)

    except:
        return HttpResponse("No token provided", status = 401)

def twitchTopGames(request):
    myobj = {
        'client_id': client_key,
        'client_secret':  client_secret,
        'grant_type': 'client_credentials'
    }

    x = requests.post("https://id.twitch.tv/oauth2/token", data = myobj)

    hed = {
        'Client-Id': client_key,
        'Authorization': 'Bearer ' + str(x.json().get('access_token'))
    }

    response = requests.get('https://api.twitch.tv/helix/games/top', headers=hed)
    return HttpResponse(response)