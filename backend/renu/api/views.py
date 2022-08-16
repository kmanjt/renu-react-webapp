from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def recaptcha(request):
    r = requests.post(
      'https://www.google.com/recaptcha/api/siteverify',
      params={
        'secret': '6Lft9n4hAAAAALA8bl6ZZj1LeaAZu7qpRgbArT8f',
        'response': request.data['captcha_value'],
      },
      headers={
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      }
    )

    return Response({'captcha': r.json()})