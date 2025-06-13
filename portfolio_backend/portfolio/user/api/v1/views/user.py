from django.contrib.auth.models import User
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from portfolio.commons.mixins.viewsets import ListCreateUpdateRetrieveViewSetMixin, ListRetrieveViewSetMixin
from portfolio.user.api.v1.serializers.user import UserInfoSerializer, UserSerializer
from portfolio.user.models import UserInfo


class UserInfoViewSet(ListCreateUpdateRetrieveViewSetMixin):
    lookup_field = 'uuid'
    lookup_url_kwarg = 'uuid'
    serializer_class = UserInfoSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        if username:
            return UserInfo.objects.filter(user__username=username)
        return UserInfo.objects.filter(user__username="dummy")


class UserViewSet(ListRetrieveViewSetMixin):
    lookup_field = 'username'
    lookup_url_kwarg = 'username'
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # print("Auth Token", self.request.headers['Authorization'])
        if self.kwargs['username'] == 'me':
            self.kwargs['username'] = self.request.user.username
        return super().get_object()
