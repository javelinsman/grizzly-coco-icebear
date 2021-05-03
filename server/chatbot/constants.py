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

MOVEMENT_FIRST = {
    **selection_base,
    "id": "movement-first",
    "message": "아래 횟수에 체크하세요.",
    "options": [
        {"id": 'MF1', "value": "20분 동안 1회 작은 움직임이 감지되었다"},
        {"id": "MF2", "value": "20분 동안 1회의 작은 움직임도 없었다"},
    ],
}

MOVEMENT_SECOND = {
    **selection_base,
    "id": "movement-second",
    "message": "자세를 바꾸거나 걸어본 후에 다시 20분동안 확인해보세요. 움직임이 1회라도 느껴졌나요?",
    "options": [
        {"id": "MS1", "value": "네, 느껴졌습니다."},
        {"id": 'MS2', "value": "아니요, 느껴지지 않았습니다."},
    ],
}

CONTRACTION_PART = {
    **selection_base,
    "id": "contraction-part",
    "message": "아래 통증의 부위에 체크하세요.",
    "options": [
        {"id": 'CPlower', "value": "아랫배"},
        {"id": "CPleft", "value": "왼쪽배"},
        {"id": "CPright", "value": "오른쪽배"},
        {"id": "CPupper", "value": "윗배"},
    ],
}

CONTRACTION_INTENSITY = {
    **selection_base,
    "id": "contraction-intensity",
    "message": "아래 강도에 체크하세요.",
    "options": [
        {"id": "CI1", "value": "약간 뻐근한 정도"},
        {"id": "CI2", "value": "콕콕 찌르는 양상"},
        {"id": "CI3", "value": "생리통과 같은 정도"},
        {"id": "CI4", "value": "쥐어짜듯이 아픔"},
        {"id": "CI5", "value": "허리를 못 펼 정도의 아픔"},
        {"id": "CI6", "value": "허리통증"},
    ],
}

CONTRACTION_CONSTIPATION = {
    **selection_base,
    "id": "contraction-constipation",
    "message": "지금 변비가 있나요?",
    "options": [
        {"id": "CCyes", "value": "네"},
        {"id": "CCno", "value": "아니요"},
    ],
}


CONTRACTION_FREQUENCY_FIRST = {
    **selection_base,
    "id": "contraction-frequency-first",
    "message": "주기적으로 반복되는지 확인해보세요. 아래 횟수에 체크하세요.",
    "options": [
        {"id": "CFF1", "value": "30분에 4회 이하"},
        {"id": "CFF2", "value": "30분에 5회 이상"},
    ],
}

CONTRACTION_FREQUENCY_SECOND = {
    **selection_base,
    "id": "contraction-frequency-second",
    "message": "다시 30분을 확인하세요. 이번에도 5회 이상 느껴졌나요?",
    "options": [
        {"id": "CFS1", "value": "네, 느껴졌습니다."},
        {"id": "CFS2", "value": "아니요, 4회 이하로 느껴졌습니다."},
    ],
}

MORNING_STATUS = {
    **selection_base,
    "id": "morning-status",
    "message": "아래 양상에 체크하세요.",
    "options": [
        {"id": "MNS1", "value": "약간 메스껍다"},
        {"id": "MNS2", "value": "구역질을 한다"},
        {"id": "MNS3", "value": "계속 토한다"},
        {"id": "MNS4", "value": "전혀 먹지 못한다"},
        {"id": "MNS5", "value": "소변량이 줄었다"},
        {"id": "MNS6", "value": "어지럽다"},
    ],
}
