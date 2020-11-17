from django.shortcuts import render
import requests
from django.http import HttpResponse
from django.shortcuts import redirect
# Create your views here.

def twitchTopGames(request):
    myobj = {
        'client_id': '8508od1jvg7mj4c1glehzmp24myczz',
        'client_secret':  'b9jw8wu5txgkz5o8sc5jumseelid6z',
        'grant_type': 'client_credentials'
    }

    x = requests.post("https://id.twitch.tv/oauth2/token", data = myobj)

    hed = {
        'Client-Id': '8508od1jvg7mj4c1glehzmp24myczz',
        'Authorization': 'Bearer ' + str(x.json().get('access_token'))
    }

    response = requests.get('https://api.twitch.tv/helix/games/top', headers=hed)
    return HttpResponse(response)

SPOTIFY_TOKEN_URL = "https://id.twitch.tv/oauth2/token"
CLIENT_SIDE_URL = "http://localhost"
PORT = 8080
REDIRECT_URI = "{}:{}/twitch/callback/q".format(CLIENT_SIDE_URL, PORT)

def login(request):
    x = redirect("https://id.twitch.tv/oauth2/authorize?client_id=8508od1jvg7mj4c1glehzmp24myczz&response_type=code&redirect_uri=" + REDIRECT_URI + "&scope=viewing_activity_read")
    return (x)

def callback(request):
    auth_token = request.GET.get('code')
    print(auth_token)
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': '8508od1jvg7mj4c1glehzmp24myczz',
        'client_secret': 'b9jw8wu5txgkz5o8sc5jumseelid6z',
    }

    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)

    print(str(post_request.json().get('access_token')))

    head = {
        'Client-Id': '8508od1jvg7mj4c1glehzmp24myczz',
        'Authorization': 'Bearer ' + str(post_request.json().get('access_token')),
    }

    test_user = requests.get("https://api.twitch.tv/helix/users", headers=head)

    return HttpResponse(test_user)