message_base = {"type": "message", "id": "msg", "authorType": "other", "nick": "알러뷰봇"}
selection_base = {
    "type": "selection",
    "authorType": "other",
    "nick": "알러뷰봇",
    "selected": None,
    "active": True,
}

INIT = {
    **message_base,
    "id": "init",
    "message": '안녕하세요, 저는 알러뷰봇입니다 👶🏻 임신 증상으로 불편함과 걱정이 있으시다면 저에게 물어봐주세요! 제가 아는 거라면 답변을 드리고, 모르는 부분은 잘 정리해두었다가 외래 진료할 때 의사 선생님께서 쉽게 확인하실 수 있게 보여드릴게요. 시작하시려면 아래 "문의 시작하기" 버튼을 눌러주세요.',
}


INIT_QUESTION = {
    **selection_base,
    "id": "init-question",
    "message": '아래의 증상 중 해당하는 것을 고른 뒤에 "응답 제출" 버튼을 눌러주세요.',
    "options": [
        {"id": "bleeding", "value": "질출혈"},
        {"id": "discharge", "value": "질분비물"},
        {"id": "movement", "value": "태동 감소"},
        {"id": "contraction", "value": "자궁수축 / 복통"},
        {"id": "morning", "value": "입덧"},
        {"id": "preeclampsia", "value": "시야장애, 두통, 어지러움, 열, 오한, 호흡곤란"},
        {"id": "etc", "value": "기타"},
    ],
}

BLEEDING_AMOUNT = {
    **selection_base,
    "id": "bleeding-amount",
    "message": "출혈량이 얼마나 되나요?",
    "options": [
        {"id": "BA1", "value": "살짝 묻어나온 정도"},
        {"id": "BA2", "value": "500원짜리 동전만큼"},
        {"id": "BA3", "value": "손바닥만큼"},
        {"id": "BA4", "value": "속옷이나 패드를 흠뻑 적실만큼"},
        {"id": "BA5", "value": "계속 흐르는 질출혈"},
    ],
}

BLEEDING_COLOR = {
    **selection_base,
    "id": "bleeding-color",
    "message": "출혈의 색깔은 어떤가요?",
    "options": [
        {"id": "BC1", "value": "옅은 갈색"},
        {"id": "BC2", "value": "갈색"},
        {"id": "BC3", "value": "핑크색"},
        {"id": "BC4", "value": "빨간색"},
    ],
}

DISCHARGE_STATUS = {
    **selection_base,
    "id": "discharge-status",
    "message": "아래 분비물의 양상 중 가장 가까운 것을 골라주세요.",
    "options": [
        {"id": "DS1", "value": "왈칵 끈적끈적한 분비물이 나오고 멈췄다"},
        {"id": "DS2", "value": "투명한 색의 콧물같은 분비물이 나왔다"},
        {"id": "DS3", "value": "가려움증이 동반된다"},
        {"id": "DS4", "value": "물처럼 계속 흐른다"},
        {"id": "DS5", "value": "하얀 덩어리가 나온다"},
    ],
}

MOVEMENT_FIRST = {
    **selection_base,
    "id": "movement-first",
    "message": "태동의 횟수에 대해 말해주세요.",
    "options": [
        {"id": "MF1", "value": "20분 동안 1회 이상의 작은 움직임이 감지되었다"},
        {"id": "MF2", "value": "20분 동안 1회의 작은 움직임도 없었다"},
    ],
}

MOVEMENT_SECOND = {
    **selection_base,
    "id": "movement-second",
    "message": "태동이 적게 느껴지시는군요. 자세를 바꾸거나 걸어본 후에 다시 20분동안 확인해주세요. 그동안 움직임이 1회라도 느껴졌나요?",
    "options": [
        {"id": "MS1", "value": "네, 느껴졌습니다."},
        {"id": "MS2", "value": "아니요, 느껴지지 않았습니다."},
    ],
}

CONTRACTION_PART = {
    **selection_base,
    "id": "contraction-part",
    "message": "어느쪽 배가 아픈가요?",
    "options": [
        {"id": "CPlower", "value": "아랫배"},
        {"id": "CPleft", "value": "왼쪽배"},
        {"id": "CPright", "value": "오른쪽배"},
        {"id": "CPupper", "value": "윗배"},
    ],
}

CONTRACTION_INTENSITY = {
    **selection_base,
    "id": "contraction-intensity",
    "message": "배가 얼마나 아픈가요?",
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
    "message": "주기적으로 반복되는지 확인해보세요. 30분 동안 몇 회의 자궁 수축 및 복통이 있었나요?",
    "options": [
        {"id": "CFF1", "value": "30분에 4회 이하"},
        {"id": "CFF2", "value": "30분에 5회 이상"},
    ],
}

CONTRACTION_FREQUENCY_SECOND = {
    **selection_base,
    "id": "contraction-frequency-second",
    "message": "다시 30분을 더 확인해주세요. 이번에도 5회 이상 느껴졌나요?",
    "options": [
        {"id": "CFS1", "value": "네, 5회 이상 느껴졌습니다."},
        {"id": "CFS2", "value": "아니요, 4회 이하로 느껴졌습니다."},
    ],
}

MORNING_STATUS = {
    **selection_base,
    "id": "morning-status",
    "message": "입덧의 양상이 어떤가요?",
    "options": [
        {"id": "MNS1", "value": "약간 메스껍다"},
        {"id": "MNS2", "value": "구역질을 한다"},
        {"id": "MNS3", "value": "계속 토한다"},
        {"id": "MNS4", "value": "전혀 먹지 못한다"},
        {"id": "MNS5", "value": "소변량이 줄었다"},
        {"id": "MNS6", "value": "어지럽다"},
    ],
}

ENDING = {
    **selection_base,
    "id": "ending",
    "message": "질문이 충분히 해결되지 않았다면 더 자세한 정황을 적어주세요. 추후 외래 진료할 때 의사 선생님께서 확인하실 수 있습니다.",
    "options": [
        {"id": "EDfreeform", "value": "네, 더 자세히 기록하고 싶어요."},
        {"id": "EDquit", "value": "아니요, 이걸로 충분합니다."},
    ],
}

ENDING_FREEFORM = {
    **selection_base,
    "id": "ending-freeform",
    "message": '현재 느끼고 계신 자세한 증상이나 의문점을 아래 입력란에 적어주세요. 다 적었으면 "전송" 버튼을 눌러주세요.',
    "options": [],
    "active": False,
}

VISIT_DU = {**message_base, "message": "분만장으로 내원해주세요."}

VISIT_DU_ASAP = {**message_base, "message": "긴급한 상황일 수 있습니다. 분만장으로 빨리 내원해주세요."}

REST_AND_CONTACT_DU = {**message_base, "message": "잠시 안정을 취하고, 다시 반복되면 분만장에 문의해보세요."}

REST_AND_WATCH = {**message_base, "message": "안정을 취하고 좀 더 지켜봐주세요."}

NATURAL_WATCH = {**message_base, "message": "임신 중 자연스러운 현상입니다. 좀 더 지켜봐주세요."}

TITIS_DU_EARLY = {
    **message_base,
    "message": "세균성 질염 혹은 곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원해주세요.",
}
AMNIOTIC_VISIT_DU = {**message_base, "message": "양수일 수 있습니다. 분만장으로 내원해주세요."}
TITIS_DU_EARLY2 = {
    **message_base,
    "message": "곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원해주세요.",
}

NORMAL_FETAL_MOVEMENT = {
    **message_base,
    "message": "정상입니다. 시간이 좀 더 흐른 뒤 태동을 다시 느껴보고 평가해주세요.",
}

CONTRACTION_OTHER_CAUSE = {
    **message_base,
    "message": "체하거나 소화와 관련된 증상일 수 있습니다. 임신중독증에서는 간기능이상으로 인한 것이기도 합니다. 분만장에 문의해보세요.",
}

MORNING_CARE = {**message_base, "message": "차가운 음료나 자극적이지 않은 음식 위주로 식사를 시도해보세요."}

OPD_EARLY = {**message_base, "message": "산부인과 진료 예약을 당겨서 내원해주세요."}

TERMINATE = {
    **message_base,
    "id": "terminate",
    "message": "말씀해주신 사항을 추후 외래 진료시 의사 선생님이 확인하실 수 있도록 잘 기록해두었습니다. 또 궁금한 게 생기면 아래 \"문의 시작하기\" 버튼을 눌러 다시 물어봐주세요!",
}
