from rest_framework import serializers
from .models import BloodPressure, BodyWeight, BloodSugar

class BloodPressureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BloodPressure
        fields = ["pk", "patient_id", "timestamp", "sbp", "dbp", "url"]

class BodyWeightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BodyWeight
        fields = ["pk", "patient_id", "timestamp", "value", "url"]

class BloodSugarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = BloodSugar
        fields = ["pk", "patient_id", "timestamp", "type", "value", "url"]