from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Permission to only allow owners to view, edit and delete their entries.
    """
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user