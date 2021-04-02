from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import BloodPressure
from .serializers import BloodPressureSerializer

# Create your views here.

class ObgyViewSet(viewsets.ModelViewSet):
    queryset = BloodPressure.objects.all()
    serializer_class = BloodPressureSerializer

    @action(detail=False, methods=["get"])
    def obgy_test(self, request):
        return Response(
            {'a': 1}
        )
 