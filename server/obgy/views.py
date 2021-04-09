from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BloodPressure, BodyWeight, BloodSugar
from .serializers import BloodPressureSerializer, BodyWeightSerializer, BloodSugarSerializer

# Create your views here.

class ObgyViewSet(viewsets.ViewSet):

    @action(detail=False, methods=["get"])
    def obgy_test(self, request):
        return Response(
            {'a': 1}
        )
 
class BloodPressureViewSet(viewsets.ModelViewSet):
    queryset = BloodPressure.objects.all()
    serializer_class = BloodPressureSerializer

class BodyWeightViewSet(viewsets.ModelViewSet):
    queryset = BodyWeight.objects.all()
    serializer_class = BodyWeightSerializer

class BloodSugarViewSet(viewsets.ModelViewSet):
    queryset = BloodSugar.objects.all()
    serializer_class = BloodSugarSerializer
