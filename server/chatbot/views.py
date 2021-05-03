from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .logic import reducer
from .constants import INIT

# Create your views here.


class ChatbotViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def load(self, request):
        return Response(
            {
                "dialogs": [INIT],
                "input": "init",
            }
        )

    @action(detail=False, methods=["post"])
    def next(self, request):
        state = request.data['state']
        action = request.data['action']
        print(action)
        return Response(reducer(state, action))
