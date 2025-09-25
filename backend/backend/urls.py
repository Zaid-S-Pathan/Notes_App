from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

def api_root(request):
    return JsonResponse({
        "message": "Notes App API",
        "endpoints": {
            "register": "/api/user/register/",
            "login": "/api/token/",
            "refresh": "/api/token/refresh/",
            "notes": "/api/notes/"
        }
    })

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", api_root, name="api_root"),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
]

