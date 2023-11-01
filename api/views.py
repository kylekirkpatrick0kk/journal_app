from .models import Journal
from .serializers import JournalSerializer
from rest_framework import generics

class JournalList(generics.ListCreateAPIView):
    queryset = Journal.objects.all().order_by('-created_date')
    serializer_class = JournalSerializer

class JournalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer