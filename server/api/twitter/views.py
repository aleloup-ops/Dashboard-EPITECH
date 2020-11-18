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

from ..firebase_auth.verification import verification
# Create your views here.

 #https://lewiskori.com/blog/user-registration-and-authorization-on-a-django-api-with-djoser-and-json-web-tokens/

client_key = os.environ.get('twitterKeyClient')
client_secret = os.environ.get('twitterKeyClientSecret')

request_token_url = "https://api.twitter.com/oauth/request_token"
access_token_url = "https://api.twitter.com/oauth/access_token"
authorize_url = "https://api.twitter.com/oauth/authorize"
uid = ''
class twitterApi():
    def connection(request):
        global uid
        
        try:
            auth_header = request.META.get("HTTP_AUTHORIZATION")

            if (verification.userExist(auth_header) == False):
                return HttpResponse("The user doesn't exist", status = 400)

            consumer = oauth.Consumer(client_key, client_secret)
            client = oauth.Client(consumer)

            print(auth_header)

            #GET FIRST OAUTH_TOKEN TO ACCESS API
            resp, content = client.request(request_token_url, "GET")
            request_token = dict(urllib.parse.parse_qsl(content.decode("utf-8")))

            #print("Request Token:")
            #print(request_token["oauth_token"])
            #print(request_token["oauth_token_secret"])

            x = redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + request_token["oauth_token"])
            return x
        except:
            return HttpResponse("No token provided", status = 401)

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
        #verification.fillTwitterFirebase(uid, request_token["oauth_token"], request_token["oauth_token_secret"])

        verification.updateValueFirebase(uid, "twitterToken", request_token["oauth_token"])
        verification.updateValueFirebase(uid, "twitterSecretToken", request_token["oauth_token_secret"])

        return HttpResponse("Logged")

    def postOnTwitter():
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(auth_header) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            real_token = oauth.Token(resp['twitterToken'], resp['twitterSecretToken'])
            real_client = oauth.Client(consumer, real_token)

            text = "Hello from API, je vais me glocker"

            real_resp, real_content = real_client.request(
                "https://api.twitter.com/1.1/statuses/update.json" + '?status="' + text + '"', "POST")

            return HttpResponse(real_content)

        except:
            return HttpResponse("No token provided", status = 401)

    def myProfile():
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(auth_header) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            real_token = oauth.Token(resp['twitterToken'], resp['twitterSecretToken'])
            real_client = oauth.Client(consumer, real_token)

            real_resp, real_content = real_client.request(
                "https://api.twitter.com/1.1/statuses/home_timeline.json", "GET")

            return HttpResponse(real_content)

        except:
            return HttpResponse("No token provided", status = 401)


    def searchTweet():
        try:
            uid = request.META.get("HTTP_AUTHORIZATION")
            if (verification.userExist(auth_header) == False):
                return HttpResponse("The user doesn't exist", status = 400)
            
            userInfos = verification.getValues(uid)
            y = json.dumps(userInfos)
            resp = json.loads(y)

            real_token = oauth.Token(resp['twitterToken'], resp['twitterSecretToken'])
            real_client = oauth.Client(consumer, real_token)

            text = "nasa"

            real_resp, real_content = real_client.request(
                "https://api.twitter.com/1.1/search/tweets.json?q=" + text + "&result_type=popular", "GET")

            return HttpResponse(real_content)

        except:
            return HttpResponse("No token provided", status = 401)


