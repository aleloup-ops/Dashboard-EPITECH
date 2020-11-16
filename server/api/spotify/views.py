from django.shortcuts import render
import requests
from django.http import HttpResponse
from django.shortcuts import redirect
import oauth2 as oauth

# Create your views here.


SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
CLIENT_SIDE_URL = "http://localhost"
PORT = 8080
REDIRECT_URI = "{}:{}/spotify/callback/q".format(CLIENT_SIDE_URL, PORT)

def twitchTopGames(request):
    x = redirect("https://accounts.spotify.com/en/authorize?client_id=8820e35d93994ec5841e459fc88e7147&response_type=code&redirect_uri=" + REDIRECT_URI + "&scope=user-read-private%20user-read-email")
    return (x)

def callback(request):
    auth_token = request.GET.get('code')
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': '8820e35d93994ec5841e459fc88e7147',
        'client_secret': '0e9f86a26d8d43099412cf1b6405c49f',
    }

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)

    return HttpResponse(post_request)