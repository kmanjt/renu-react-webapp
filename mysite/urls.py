"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from . import views
from django.urls import path, include
from django.contrib.auth import views as authviews
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView


urlpatterns = [
    path("admin/", admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path("about", views.about, name="about"),
    path("education", views.education, name="education"),
    path("contact", views.contact, name="contact"),
    path("accounts/profile", views.profile, name="profile"),
    path("sensordata", views.sensor_data, name="sensordata"),
    path('postbeta/', views.postbeta),
    path("payments", views.payments, name="payments"),
  
    # Django login authentication
    path("accounts/login", views.login, name="login"),
    path("postlogin/", views.postlogin),
    path("logout/", views.logout, name="log"),
    path("accounts/register", views.register, name="register"),
    path("postregister/", views.postregister),
    path('accounts/reset', views.reset, name="reset"),
    path('postreset/', views.postreset),
    path('postcontact/', views.postcontact),
] 

