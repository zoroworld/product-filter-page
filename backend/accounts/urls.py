# accounts/urls.py
from django.urls import path
from .views import LoginView, LogoutView, MeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # your custom JWT login
    path("login/", LoginView.as_view(), name="login"),

    # token refresh (still use SimpleJWT)
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # protected and logout routes
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
