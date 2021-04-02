from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

#from .models import MarkedBirthEntry
#from .serializers import MarkedBirthEntrySerializer

# Create your views here.

class ObgyViewSet(viewsets.ViewSet):
    #queryset = MarkedBirthEntry.objects.all()
    #serializer_class = MarkedBirthEntrySerializer

    @action(detail=False, methods=["get"])
    def obgy_test(self, request):
        return Response(
            {'a': 1}
        )
