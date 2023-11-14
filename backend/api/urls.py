from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from api.views import (
    JournalList,
    JournalListOwner,
    JournalDetail,
    UserList,
    UserDetail,
)

urlpatterns = [
    path("journals/", JournalList.as_view()),
    path("journals/<int:pk>/", JournalDetail.as_view()),
    path("journals/<str:owner>/", JournalListOwner.as_view()),
    path("users/", UserList.as_view()),
    path("users/<int:pk>/", UserDetail.as_view()),
    path("auth/", obtain_auth_token),
]
