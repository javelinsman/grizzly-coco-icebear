from django.db import models


class BloodPressure(models.Model) :
    patient_id = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    sbp = models.FloatField(default=0)
    dbp = models.FloatField(default=0)

class BodyWeight(models.Model) :
    patient_id = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    value = models.FloatField(default=0)

class BloodSugar(models.Model) :
    patient_id = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, default="empty")
    value = models.FloatField(default=0)

