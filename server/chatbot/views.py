from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .logic import reducer
from .constants import INIT
from .models import ChatbotState

# Create your views here.


class ChatbotViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def load(self, request):
        encrypted_pk = request.query_params["encryptedPk"]

        init_state = {
            "dialogs": [INIT],
            "input": "init",
        }

        if encrypted_pk == "anonymous":
            return init_state

        if not ChatbotState.objects.filter(encrypted_pk=encrypted_pk).exists():
            ChatbotState.objects.create(encrypted_pk=encrypted_pk, state=init_state)

        return Response(
            ChatbotState.objects.filter(encrypted_pk=encrypted_pk).first().state
        )

    @action(detail=False, methods=["post"])
    def next(self, request):
        encrypted_pk = request.data["encryptedPk"]
        state = request.data["state"]
        action = request.data["action"]
        next_state = reducer(state, action)
        if encrypted_pk != "anonymous":
            if not ChatbotState.objects.filter(encrypted_pk=encrypted_pk).exists():
                ChatbotState.objects.create(encrypted_pk=encrypted_pk, state=init_state)
            obj = ChatbotState.objects.filter(encrypted_pk=encrypted_pk).first()
            obj.state = next_state
            obj.save()
        return Response(next_state)
