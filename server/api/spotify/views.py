from django.shortcuts import render
import requests
from django.http import HttpResponse
from django.shortcuts import redirect
import oauth2 as oauth
import urllib3
import urllib
import os
import json
from ..firebase_auth.verification import verification


SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
CLIENT_SIDE_URL = "http://localhost"
PORT = 8080
REDIRECT_URI = "{}:{}/spotify/callback/q".format(CLIENT_SIDE_URL, PORT)
client_key = os.environ.get('spotifyKeyClient')
client_secret = os.environ.get('spotifyKeyClientSecret')
uid = ''

def login(request, user_uid):
    global uid

    uid = user_uid

    x = redirect("https://accounts.spotify.com/en/authorize?client_id=8820e35d93994ec5841e459fc88e7147&response_type=code&redirect_uri=" + REDIRECT_URI + "&scope=user-read-private%20user-read-email%20user-top-read")
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

    print(auth_token)

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)
    verification.updateValueFirebase(uid, "spotifyToken", str(post_request.json().get("access_token")))

    return redirect('http://localhost:4200/widgets')

def spotifyCall(request, url):
    try:
        uid = request.META.get("HTTP_AUTHORIZATION")
        if (verification.userExist(uid) == False):
            return HttpResponse("The user doesn't exist", status = 400)

        userInfos = verification.getValues(uid)

        y = json.dumps(userInfos)
        resp = json.loads(y)

        code_payload = {
            "Authorization": "Bearer " + resp['spotifyToken'],
        }

        getInfo = requests.get(url, headers=head)

        return HttpResponse(getInfo)

    except:
        return HttpResponse("No token provided", status = 401)

def getProfile(request):
    #try:
    uid = request.META.get("HTTP_AUTHORIZATION")
    if (verification.userExist(uid) == False):
        return HttpResponse("The user doesn't exist", status = 400)

    userInfos = verification.getValues(uid)

    print(uid)

    y = json.dumps(userInfos)
    #print(y)
    resp = json.loads(y)

    code_payload = {
        "Authorization": "Bearer " + resp['spotifyToken'],
    }

    getInfo = requests.get("https://api.spotify.com/v1/me", headers=code_payload)

    return HttpResponse(getInfo)

    #except:
        #return HttpResponse("No token provided", status = 401)
    #return spotifyCall(request, "https://api.spotify.com/v1/me")

def getPlaylists(request):
    return spotifyCall(request, "https://api.spotify.com/v1/me/playlists")

def getTopTracks(requet):
    return spotifyCall(request, "https://api.spotify.com/v1/me/top/tracks")
