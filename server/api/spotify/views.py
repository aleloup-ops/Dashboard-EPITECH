from django.shortcuts import render
import requests
from django.http import HttpResponse
# Create your views here.

def spotifyTest(request):
    
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