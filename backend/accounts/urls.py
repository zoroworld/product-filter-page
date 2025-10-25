from django.urls import path
from .views import  LoginView, LogoutView, MeView, get_csrf

urlpatterns = [
    path("csrf/", get_csrf),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("logout/", LogoutView.as_view()),
]

