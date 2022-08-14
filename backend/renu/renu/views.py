from django.shortcuts import render
from itsdangerous import Serializer
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer
from django.conf import settings
from datetime import datetime
import pyrebase
import os

config={
  "apiKey": "AIzaSyCRLXur7Aruh_EADjxKRsWtA-HY0P-G_ao",
  "authDomain": "renu-22cf0.firebaseapp.com",
  "databaseURL": "https://renu-22cf0-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "renu-22cf0",
  "storageBucket": "renu-22cf0.appspot.com",
  "messagingSenderId": "478924071511",
  "appId": "1:478924071511:web:d5cd8a215a9cd724bb7912",
  "measurementId": "G-F0J0XM9SJQ"
}

firebase= pyrebase.initialize_app(config)
db=firebase.database()

class Comment(APIView):
    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        username = request.data.get('username')
        photoURL = request.data.get('photoURL')
        commentBody = request.data.get('commentBody')
        slug = request.data.get('slug')
        now = datetime.now()
        current_date = now.strftime("%d:%m:%Y")
        current_time = now.strftime("%H:%M:%S")
        try:
            # const payload={name, time, reason}
            data = {
              "username":username,
              "uid":uid,
              "time":current_date + " " + current_time,
              "photoURL":photoURL,
              "body":commentBody
            }
            results = db.child("blog-comments").child(slug).push(data)
            return Response("Time Added")
        except:
            return Response("Something went wrong.")

    def get_comments(self, request, *args, **kwargs):
      comments = database.child(blog_comments)