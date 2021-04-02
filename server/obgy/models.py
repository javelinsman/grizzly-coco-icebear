from django.db import models

# Create your models here.
class BloodPressure(models.Model) :
    patient_id = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    value = models.FloatField()
