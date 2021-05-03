from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.


class ChatbotViewSet(viewsets.ViewSet):
    @action(detail=False, methods=["get"])
    def load(self, request):
        return Response(
            [
                {
                    "type": "selection",
                    "authorType": "other",
                    "nick": "알러뷰봇",
                    "message": "어디가 불편하신가요?",
                    "options": ["질출혈", "질분비물", "태동 감소", "자궁수축 / 복통", "입덧"],
                    "selected": None,
                    "active": True,
                }
            ]
        )

    @action(detail=False, methods=["post"])
    def next(self, request):
        state = request.data['state']
        action = request.data['action']
        history = state[:-1]
        question = state[-1]
        return Response(
            [
                *history,
                question if question["type"] == "message" else {**question, "active": False},
                {"type": "message", "authorType": "self", "nick": "회원님", "message": action},
                {"type": "message", "authorType": "other", "nick": "알러뷰봇", "message": action},
            ]
        )

