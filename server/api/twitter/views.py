#########################

from django.shortcuts import render
import requests
from django.http import HttpResponse
import base64
from django.shortcuts import redirect
import oauth2 as oauth
import random
import time
import urllib3
import urllib
# Create your views here.

client_key = 'JODRB8r7XMXkeD8zrBnlK5QYZ'
client_secret = 'oRld3GAzhOvKmq4FRRRRW48G2KZgcz2nYqa3aZ0UcD4gUr6cYE'

def spotifyTest(request):
    request_token_url = "https://api.twitter.com/oauth/request_token"
    access_token_url = "https://api.twitter.com/oauth/access_token"
    authorize_url = "https://api.twitter.com/oauth/authorize"

    consumer = oauth.Consumer(client_key, client_secret)
    client = oauth.Client(consumer)

    #GET FIRST OAUTH_TOKEN TO ACCESS API
    resp, content = client.request(request_token_url, "GET")
    request_token = dict(urllib.parse.parse_qsl(content.decode("utf-8")))

    print("Request Token:")
    print(request_token["oauth_token"])
    print(request_token["oauth_token_secret"])

    x = redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + request_token["oauth_token"])
    return x

def callback(request):

    
    oauth_token = request.GET.get('oauth_token')
    oauth_verifier = request.GET.get('oauth_verifier')

    code_payload = {
        "oauth_token": oauth_token,
        "oauth_verifier": oauth_verifier
    }

    post_request = requests.post("https://api.twitter.com/oauth/access_token", data=code_payload)
    consumer = oauth.Consumer(client_key, client_secret)

    request_token = dict(urllib.parse.parse_qsl(post_request.content.decode("utf-8")))
    print(request_token["oauth_token"])
    print(request_token["oauth_token_secret"])

    print(post_request.content)

    real_token = oauth.Token(request_token["oauth_token"], request_token["oauth_token_secret"])
    real_client = oauth.Client(consumer, real_token)
    real_resp, real_content = real_client.request(
        "https://api.twitter.com/1.1/users/show.json" + '?user_id=' + "1976143068", "GET")


    #real_resp, real_content = real_client.request(
    #    "https://api.twitter.com/1.1/statuses/update.json" + "?status=Hello from API, je vais me glocker", "POST")

    return HttpResponse(real_content)