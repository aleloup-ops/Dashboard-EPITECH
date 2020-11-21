#########################

from django.shortcuts import render
import requests
from django.http import HttpResponse
import base64
from django.shortcuts import redirect
import oauth2 as oauth
from firebase_admin import auth
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import firestore
import random
import time
import urllib3
import urllib
import os
from requests_oauthlib import OAuth1Session
from ..firebase_auth.verification import verification


client_key = os.environ.get('trelloKeyClient')
client_secret = os.environ.get('trelloKeyClientSecret')

request_token_url = "https://trello.com/1/OAuthGetRequestToken"
access_token_url = "https://trello.com/1/OAuthGetAccessToken"
authorize_url = "https://api.twitter.com/oauth/authorize"

CLIENT_SIDE_URL = "http://localhost"
PORT = 8080
REDIRECT_URI = "{}:{}/trello/callback/q".format(CLIENT_SIDE_URL, PORT)

uid = ''
request_token = {}
resource_owner_key = ''
resource_owner_secret = ''

class trelloApi():
    def connection(request):
        global uid
        global resource_owner_key, resource_owner_secret

        consumer = oauth.Consumer(client_key, client_secret)
        client = oauth.Client(consumer)

        session = OAuth1Session(client_key=client_key, client_secret=client_secret)
        response = session.fetch_request_token(request_token_url)
        resource_owner_key, resource_owner_secret = response.get('oauth_token'), response.get('oauth_token_secret')

        x = redirect("https://trello.com/1/OAuthAuthorizeToken?oauth_token=" + resource_owner_key + "&scope=read,write,account" + "&return_url=" + REDIRECT_URI)
        return x
   
    def callback(request):
        oauth_token = request.GET.get('oauth_token')
        oauth_verifier = request.GET.get('oauth_verifier')

        code_payload = {
            "oauth_token": oauth_token,
            "oauth_verifier": oauth_verifier,
        }

        session = OAuth1Session(client_key=client_key, client_secret=client_secret,
                            resource_owner_key=resource_owner_key, resource_owner_secret=resource_owner_secret,
                            verifier=oauth_verifier)
        access_token = session.fetch_access_token(access_token_url)

        # #get board
        # post_request = requests.get("https://api.trello.com/1/members/me/boards?key=" + client_key + "&token=" + access_token['oauth_token'])
        # # get cards
        # post_request = requests.get("https://api.trello.com/1/boards/" + "5fa285b3a03eb66f820cf28b" + "/cards?key=" + client_key + "&token=" + access_token['oauth_token'])
        # #get members of a board 
        # post_request = requests.get("https://api.trello.com/1/boards/" + "5fa285b3a03eb66f820cf28b" + "/members?key=" + client_key + "&token=" + access_token['oauth_token'])
        
        return HttpResponse("connected")

    def myBoards(request):
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(uid) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            post_request = requests.get("https://api.trello.com/1/members/me/boards?key=" + client_key + "&token=" + resp['trelloToken'])

            return HttpResponse(post_request)

        except:
            return HttpResponse("No token provided", status = 401)

    def getCards(request):
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(uid) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            post_request = requests.get("https://api.trello.com/1/boards/" + "5fa285b3a03eb66f820cf28b" + "/cards?key=" + client_key + "&token=" + resp['trelloToken'])


            return HttpResponse(post_request)

        except:
            return HttpResponse("No token provided", status = 401)

    def getMembers(request):
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(uid) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            post_request = requests.get("https://api.trello.com/1/boards/" + "5fa285b3a03eb66f820cf28b" + "/members?key=" + client_key + "&token=" + resp['trelloToken'])

            return HttpResponse(post_request)

        except:
            return HttpResponse("No token provided", status = 401)