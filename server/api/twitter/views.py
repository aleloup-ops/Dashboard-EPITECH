from django.shortcuts import render
import requests
from django.http import HttpResponse
# Create your views here.

def twitchTopGames(request):
    myobj = {
        'client_id': '8820e35d93994ec5841e459fc88e7147',
        'response_type':  'code',
        'redirect_uri': 'http://localhost'
    }

    x = requests.get("https://accounts.spotify.com/en/authorize?client_id=8820e35d93994ec5841e459fc88e7147&response_type=code&redirect_uri=http://localhost:8080")

    return HttpResponse(response)