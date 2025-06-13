from django.urls import path, include
# from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from portfolio.user.api.v1.views.token import ObtainAuthTokenView
from portfolio.user.api.v1.views.user import UserInfoViewSet, UserViewSet

ROUTER = DefaultRouter()
ROUTER.register('account', UserViewSet, basename='user')
ROUTER.register('info', UserInfoViewSet, basename='info')
urlpatterns = [path('auth/obtain/', ObtainAuthTokenView.as_view(), name='obtain'), ] + ROUTER.urls
