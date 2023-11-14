from django.db import models


class Journal(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100, blank=True, null=True, default="")
    starred = models.BooleanField(default=False)
    entry = models.TextField(max_length=2500)
    owner = models.ForeignKey(
        "auth.User",
        related_name="journals",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
