from .constants import BLEEDING_AMOUNT, DISCHARGE_STATUS


def context_from_dialogs(dialogs):
    return dialogs[:-1]


def state_from_dialogs(dialogs):
    return dialogs[-1] if len(dialogs) else "init"


def deactivate_question(question):
    return question if question["type"] == "message" else {**question, "active": False}


def next_bot_response(state, action):
    message_base = {"type": "message", "authorType": "other", "nick": "알러뷰봇"}
    selection_base = {"type": "selection", "authorType": "other", "nick": "알러뷰봇"}

    # Bleeding
    if state["id"] == "init-question" and action["id"] == "bleeding":
        return BLEEDING_AMOUNT
    if state["id"] == "bleeding-amount" and action["id"] == "BA1":
        return {**message_base, "message": "안정을 취하고 지켜보세요."}
    if state["id"] == "bleeding-amount" and action["id"] == "BA2":
        return {**message_base, "message": "안정을 취하고, 다시 반복되면 분만장에 문의하세요."}
    if state["id"] == "bleeding-amount" and action["id"] == "BA3":
        return {**message_base, "message": "분만장으로 내원하세요."}
    if state["id"] == "bleeding-amount" and action["id"] == "BA4":
        return {**message_base, "message": "분만장으로 내원하세요."}
    if state["id"] == "bleeding-amount" and action["id"] == "BA5":
        return {**message_base, "message": "분만장으로 빨리 내원하세요."}

    # Discharge
    if state["id"] == "init-question" and action["id"] == "discharge":
        return DISCHARGE_STATUS
    if state["id"] == "discharge-status" and action["id"] in ("DS1", "DS2"):
        return {**message_base, "message": "임신 중 자연스러운 현상입니다. 지켜보세요."}
    if state["id"] == "discharge-status" and action["id"] == "DS3":
        return {**message_base, "message": "세균성 질염 혹은 곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원하세요."}
    if state["id"] == "discharge-status" and action["id"] == "DS4":
        return {**message_base, "message": "양수일 수 있습니다. 분만장으로 내원하세요."}
    if state["id"] == "discharge-status" and action["id"] == "DS5":
        return {**message_base, "message": "곰팡이균에 의한 질염 가능성이 있습니다. 산부인과 진료 예약을 당겨서 내원하세요."}


    if state["id"] == "init-question" and action["id"] == "ut-cont":
        return {**message_base, "message": "복통 ㅠㅠ"}

    return {**message_base, "message": "오류!"}


def reducer(dialogs, action):
    context = context_from_dialogs(dialogs)
    state = state_from_dialogs(dialogs)

    if state["type"] == "selection":
        return [
            *context,
            deactivate_question(state),
            {
                "type": "message",
                "authorType": "self",
                "nick": "회원님",
                "message": action["value"],
            },
            next_bot_response(state, action),
        ]
