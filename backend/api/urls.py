from django.urls import path, include

from api.views import (
    CustomTokenObtainPairView,
    JournalList,
    JournalListOwner,
    JournalDetail,
    UserList,
    UserDetail,
)

urlpatterns = [
    path("journals/", JournalList.as_view()),
    path("journals/detail/<int:pk>", JournalDetail.as_view()),
    path("journals/<int:user_id>/", JournalListOwner.as_view()),
    path("users/", UserList.as_view()),
    path("users/<int:pk>/", UserDetail.as_view()),
    path(
        "token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
]
