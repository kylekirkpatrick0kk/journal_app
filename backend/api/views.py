from .models import Journal
from .serializers import JournalSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser
from .permissions import IsOwner

class JournalList(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer

class JournalListOwner(generics.ListCreateAPIView):
    permission_classes = [IsOwner]
    serializer_class = JournalSerializer

    def get_queryset(self):
        # Filter the queryset to include only entries owned by the authenticated user
        return Journal.objects.filter(owner=self.request.user).order_by('-created_date')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        return super().perform_create(serializer)

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