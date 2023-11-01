from django.db import models

# Create your models here.

class Journal(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, null=True, default='')
    starred = models.BooleanField(default=False)
    entry = models.TextField(max_length=250)