from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views import View
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request):
        import json
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "message": "Login success",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "username": user.username,
            })
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)


class MeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return JsonResponse({
            "username": request.user.username,
            "email": request.user.email
        })


class LogoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()  # mark as invalid if blacklist enabled
            return JsonResponse({"message": "Logout successful"})
        except Exception:
            return JsonResponse({"error": "Invalid token"}, status=400)
