from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .logic import reducer

# Create your views here.


class ChatbotViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def load(self, request):
        return Response(
            [
                {
                    "id": "init-question",
                    "type": "selection",
                    "authorType": "other",
                    "nick": "알러뷰봇",
                    "message": "어디가 불편하신가요?",
                    "options": [
                        {"id": "bleeding", "value": "질출혈"},
                        {"id": "discharge", "value": "질분비물"},
                        {"id": "movement", "value": "태동 감소"},
                        {"id": "contraction", "value": "자궁수축 / 복통"},
                        {"id": "morning", "value": "입덧"},
                    ],
                    "selected": None,
                    "active": True,
                }
            ]
        )

    @action(detail=False, methods=["post"])
    def next(self, request):
        state = request.data['state']
        action = request.data['action']
        print(action)
        return Response(reducer(state, action))
