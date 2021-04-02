from rest_framework import serializers
from .models import BloodPressure

class BloodPressureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BloodPressure
        fields = ["pk", "patient_id", "timestamp", "value"]