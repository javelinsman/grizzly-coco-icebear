from django.db import models

# Create your models here.
class ChatbotState(models.Model):
    encrypted_pk = models.TextField(primary_key=True)
    state = models.JSONField(null=True)