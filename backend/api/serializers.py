from rest_framework import serializers
from .models import Journal
from django.contrib.auth.models import User


class JournalSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Journal
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    journals = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Journal.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "journals"]
