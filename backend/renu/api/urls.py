from django.urls import path
from . import views


urlpatterns = [
    path('recaptcha/', views.recaptcha)
]