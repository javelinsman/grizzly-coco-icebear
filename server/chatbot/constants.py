message_base = {"type": "message", "authorType": "other", "nick": "알러뷰봇"}
selection_base = {"type": "selection", "authorType": "other", "nick": "알러뷰봇", "selected": None, "active": True}

BLEEDING_AMOUNT = {
    **selection_base,
    "id": "bleeding-amount",
    "message": "아래 출혈량에 체크하세요.",
    "options": [
        {"id": 'BA1', "value": "살짝 묻어나온 정도"},
        {"id": "BA2", "value": "500원짜리 동전만큼"},
        {"id": "BA3", "value": "손바닥만큼"},
        {"id": "BA4", "value": "속옷이나 패드를 흠뻑 적실만큼"},
        {"id": "BA5", "value": "계속 흐르는 질출혈"},
    ],
}

BLEEDING_COLOR = {
    **selection_base,
    "id": "bleeding-color",
    "message": "아래 출혈색깔에 체크하세요.",
    "options": [
        {"id": 'BC1', "value": "옅은 갈색"},
        {"id": "BC2", "value": "갈색"},
        {"id": "BC3", "value": "핑크색"},
        {"id": "BC4", "value": "빨간색"},
    ],
}

DISCHARGE_STATUS = {
    **selection_base,
    "id": "discharge-status",
    "message": "아래 양상에 체크하세요.",
    "options": [
        {"id": 'DS1', "value": "왈칵 끈적끈적한 분비물이 나오고 멈췄다"},
        {"id": "DS2", "value": "투명한 색의 콧물같은 분비물이 나왔다"},
        {"id": "DS3", "value": "가려움증이 동반된다"},
        {"id": "DS4", "value": "물처럼 계속 흐른다"},
        {"id": "DS5", "value": "하얀 덩어리가 나온다"},
    ],
}


