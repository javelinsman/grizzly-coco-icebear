from .constants import (
    BLEEDING_AMOUNT,
    DISCHARGE_STATUS,
    BLEEDING_COLOR,
    MOVEMENT_FIRST,
    MOVEMENT_SECOND,
    CONTRACTION_PART,
    CONTRACTION_INTENSITY,
    CONTRACTION_FREQUENCY_FIRST,
    CONTRACTION_FREQUENCY_SECOND,
    CONTRACTION_CONSTIPATION,
    MORNING_STATUS,
)


def context_from_dialogs(dialogs):
    return dialogs[:-1]


def state_from_dialogs(dialogs):
    return dialogs[-1] if len(dialogs) else "init"


def deactivate_question(question, action):
    return (
        question
        if question["type"] == "message"
        else {**question, "selected": action, "active": False}
    )


def next_bot_response(state, action, context):
    message_base = {"type": "message", "authorType": "other", "nick": "알러뷰봇"}
    selection_base = {"type": "selection", "authorType": "other", "nick": "알러뷰봇"}

    # Bleeding
    if state["id"] == "init-question" and action["id"] == "bleeding":
        return BLEEDING_AMOUNT
    if state["id"] == "bleeding-amount":
        return BLEEDING_COLOR
    if state["id"] == "bleeding-color":
        print(context)
        amount = context[-2]["selected"]["id"]
        color = action["id"]

        print(amount, color)

        if amount == "BA5":
            return {**message_base, "message": "분만장으로 빨리 내원하세요."}
        elif color == "BC4" or amount in ("BA4", "BA5"):
            return {**message_base, "message": "분만장으로 내원하세요."}
        elif amount == "BA2":
            return {**message_base, "message": "안정을 취하고, 다시 반복되면 분만장에 문의하세요."}
        else:
            return {**message_base, "message": "안정을 취하고 지켜보세요."}

    # Discharge
    if state["id"] == "init-question" and action["id"] == "discharge":
        return DISCHARGE_STATUS
    if state["id"] == "discharge-status" and action["id"] in ("DS1", "DS2"):
        return {**message_base, "message": "임신 중 자연스러운 현상입니다. 지켜보세요."}
    if state["id"] == "discharge-status" and action["id"] == "DS3":
        return {
            **message_base,
            "message": "세균성 질염 혹은 곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원하세요.",
        }
    if state["id"] == "discharge-status" and action["id"] == "DS4":
        return {**message_base, "message": "양수일 수 있습니다. 분만장으로 내원하세요."}
    if state["id"] == "discharge-status" and action["id"] == "DS5":
        return {
            **message_base,
            "message": "곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원하세요.",
        }

    # Movement
    if state["id"] == "init-question" and action["id"] == "movement":
        return MOVEMENT_FIRST
    if state["id"] == "movement-first" and action["id"] in ("MF1",):
        return {**message_base, "message": "정상입니다. 시간이 좀 더 흐른 뒤 태동을 다시 느껴보고 평가하세요."}
    if state["id"] == "movement-second" and action["id"] in ("MS1",):
        return {**message_base, "message": "정상입니다. 시간이 좀 더 흐른 뒤 태동을 다시 느껴보고 평가하세요."}
    if state["id"] == "movement-first" and action["id"] in ("MF2",):
        return MOVEMENT_SECOND
    if state["id"] == "movement-second" and action["id"] in ("MS2",):
        return {**message_base, "message": "분만장으로 내원하세요."}

    # Contraction
    if state["id"] == "init-question" and action["id"] == "contraction":
        return CONTRACTION_PART
    if state["id"] == "contraction-part" and action["id"] in ("CPupper",):
        return {**message_base, "message": "체하거나 소화와 관련된 증상일 수 있습니다. 임신중독증에서는 간기능이상으로 인한 것이기도 합니다. 분만장으로 문의하세요."}
    if state["id"] == "contraction-part" and action["id"] in ("CPlower", "CPright"):
        return CONTRACTION_INTENSITY
    if state["id"] == "contraction-part" and action["id"] in ("CPleft",):
        return CONTRACTION_CONSTIPATION
    if state["id"] == "contraction-constipation" and action["id"] == "CCyes":
        return {**message_base, "message": "체하거나 소화와 관련된 증상일 수 있습니다. 임신중독증에서는 간기능이상으로 인한 것이기도 합니다. 분만장으로 문의하세요."}
    if state["id"] == "contraction-constipation" and action["id"] == "CCno":
        return CONTRACTION_INTENSITY
    if state["id"] == "contraction-intensity" and action["id"] in ("CI1", "CI2"):
        return {**message_base, "message": "괜찮습니다. 임신 중 자연스러운 증상입니다."}
    if state["id"] == "contraction-intensity" and action["id"] in ("CI3",):
        return CONTRACTION_FREQUENCY_FIRST
    if state["id"] == "contraction-intensity" and action["id"] in ("CI4", "CI5", "CI6"):
        return {**message_base, "message": "분만장으로 내원하세요."}
    if state["id"] == "contraction-frequency-first" and action["id"] == "CFF1":
        return {**message_base, "message": "괜찮습니다. 임신 중 자연스러운 증상입니다."}
    if state["id"] == "contraction-frequency-first" and action["id"] == "CFF2":
        return CONTRACTION_FREQUENCY_SECOND
    if state["id"] == "contraction-frequency-second" and action["id"] == "CFS1":
        return {**message_base, "message": "분만장으로 내원하세요."}
    if state["id"] == "contraction-frequency-second" and action["id"] == "CFS2":
        return {**message_base, "message": "괜찮습니다. 임신 중 자연스러운 증상입니다."}

    # Morning
    if state["id"] == "init-question" and action["id"] == "morning":
        return MORNING_STATUS
    if state["id"] == "morning-status" and action["id"] in ("MNS1", "MNS2"):
        return {**message_base, "message": "차가운 음료나 자극적이지 않은 음식 위주로 식사를 시도하세요."}
    if state["id"] == "morning-status" and action["id"] in ("MNS3", "MNS4", "MNS5", "MNS6"):
        return {**message_base, "message": "산부인과 진료 예약을 당겨서 내원하세요."}

    return {**message_base, "message": "오류가 발생했습니다."}


def reducer(dialogs, action):
    context = context_from_dialogs(dialogs)
    state = state_from_dialogs(dialogs)

    if state["type"] == "selection":
        return [
            *context,
            deactivate_question(state, action),
            {
                "type": "message",
                "authorType": "self",
                "nick": "회원님",
                "message": action["value"],
            },
            next_bot_response(state, action, context),
        ]
