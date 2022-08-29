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
import json
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
            return Response("Comment added")
        except:
            return Response("Something went wrong.")

class CommentList(APIView):
  def post(self, request, *args, **kwargs):
        slug = request.data.get('slug')
        comments = db.child('blog-comments').child(slug).get()
        array = []
        try:
          for comment in comments.each():
            array.append(comment.val())
          return Response(array)
        except:
          return Response([])

class SaveBlog(APIView):
    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        blog_title = request.data.get('blog_title')
        blog_link = request.data.get('blog_link')
        blog_excerpt = request.data.get('blog_excerpt')
        blog_date = request.data.get('blog_date')
        blog_photo = request.data.get('blog_photo')
        try:
            data = {
              "title":blog_title,
              "link":blog_link,
              "excerpt":blog_excerpt,
              "date":blog_date,
              "photo":blog_photo
            }
            results = db.child("users").child(uid).child(blog_title).set(data)
            return Response("Blog saved")
        except:
            return Response("Something went wrong.")
    
class GetSavedBlogs(APIView):
    def post(self, request, *args, **kwargs):
      uid = request.data.get('uid')
      logs = db.child('users').child(uid).get()
      array = []
      for log in logs.each():
            array.append(log.val())
      return Response(array)



class UnsaveBlog(APIView):
    def post(self, request, *args, **kwargs):
      uid = request.data.get('uid')
      title = request.data.get('title')
      if uid and title:
        db.child('users').child(uid).child(title).remove()
        logs = db.child('users').child(uid).get()
        array = []
        if (logs.each()):
          for log in logs.each():
                array.append(log.val())
        return Response(array)
        
      else:
        return Response(f"Could not unsave {title} for user {uid}")