from django.urls import path

from api.views import JournalList, JournalDetail

urlpatterns = [
    path("journals/", JournalList.as_view()),
    path("journals/<int:pk>", JournalDetail.as_view())
]