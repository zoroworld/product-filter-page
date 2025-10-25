from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views import View
import json

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"detail": "CSRF cookie set"})

class LoginView(View):
    def post(self, request):
        data = json.loads(request.body)
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )

        if user:
            login(request, user)
            return JsonResponse({"message": "Login success", "username": user.username})
        return JsonResponse({"error": "Invalid credentials"}, status=401)

class MeView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse({"username": request.user.username})
        return JsonResponse({"error": "Not logged in"}, status=401)

class LogoutView(View):
    def post(self, request):
        logout(request)
        return JsonResponse({"message": "Logged out"})
