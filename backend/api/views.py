from .models import Journal
from .serializers import JournalSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser
from .permissions import IsOwner

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["user_id"] = user.id

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JournalList(generics.ListCreateAPIView):
    # permission_classes = [IsAdminUser]
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)


class JournalListOwner(generics.ListCreateAPIView):
    permission_classes = [IsOwner]
    serializer_class = JournalSerializer

    def get_queryset(self):
        # Filter the queryset to include only entries owned by the authenticated user
        return Journal.objects.filter(owner=self.request.user).order_by(
            "-created_date"
        )


class JournalDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
