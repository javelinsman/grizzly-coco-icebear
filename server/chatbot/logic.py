from .constants import (
    INIT_QUESTION,
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
    ENDING,
    ENDING_FREEFORM,
    VISIT_DU,
    VISIT_DU_ASAP,
    REST_AND_CONTACT_DU,
    REST_AND_WATCH,
    NATURAL_WATCH,
    TITIS_DU_EARLY,
    TITIS_DU_EARLY2,
    AMNIOTIC_VISIT_DU,
    NORMAL_FETAL_MOVEMENT,
    CONTRACTION_OTHER_CAUSE,
    MORNING_CARE,
    OPD_EARLY,
    TERMINATE,
)


def context_from_dialogs(dialogs):
    return dialogs[:-1]


def state_from_dialogs(dialogs):
    return dialogs[-1] if len(dialogs) else "init"


def deactivate_question(question, action):
    return (
        question
        if question["type"] == "message"
        else {**question, "selected": action["id"], "active": False}
    )


def next_bot_response(state, action, context):
    message_base = {
        "type": "message",
        "id": "msg",
        "authorType": "other",
        "nick": "알러뷰봇",
    }
    selection_base = {"type": "selection", "authorType": "other", "nick": "알러뷰봇"}

    # Init
    if action["id"] == "init":
        return INIT_QUESTION

    # PE, etc
    if state["id"] == "init-question" and action["id"] == "preeclampsia":
        return VISIT_DU
    if state["id"] == "init-question" and action["id"] == "etc":
        return ENDING_FREEFORM

    # Bleeding
    if state["id"] == "init-question" and action["id"] == "bleeding":
        return BLEEDING_AMOUNT
    if state["id"] == "bleeding-amount":
        return BLEEDING_COLOR
    if state["id"] == "bleeding-color":
        amount = context[-2]["selected"]
        color = action["id"]
        if amount == "BA5":
            return VISIT_DU_ASAP
        elif color == "BC4" or amount in ("BA4", "BA5"):
            return VISIT_DU
        elif amount == "BA2":
            return REST_AND_CONTACT_DU
        else:
            return REST_AND_WATCH

    # Discharge
    if state["id"] == "init-question" and action["id"] == "discharge":
        return DISCHARGE_STATUS
    if state["id"] == "discharge-status" and action["id"] in ("DS1", "DS2"):
        return NATURAL_WATCH
    if state["id"] == "discharge-status" and action["id"] == "DS3":
        return TITIS_DU_EARLY
    if state["id"] == "discharge-status" and action["id"] == "DS4":
        return AMNIOTIC_VISIT_DU
    if state["id"] == "discharge-status" and action["id"] == "DS5":
        return TITIS_DU_EARLY2

    # Movement
    if state["id"] == "init-question" and action["id"] == "movement":
        return MOVEMENT_FIRST
    if state["id"] == "movement-first" and action["id"] in ("MF1",):
        return NORMAL_FETAL_MOVEMENT
    if state["id"] == "movement-second" and action["id"] in ("MS1",):
        return NORMAL_FETAL_MOVEMENT
    if state["id"] == "movement-first" and action["id"] in ("MF2",):
        return MOVEMENT_SECOND
    if state["id"] == "movement-second" and action["id"] in ("MS2",):
        return VISIT_DU

    # Contraction
    if state["id"] == "init-question" and action["id"] == "contraction":
        return CONTRACTION_PART
    if state["id"] == "contraction-part" and action["id"] in ("CPupper",):
        return CONTRACTION_OTHER_CAUSE
    if state["id"] == "contraction-part" and action["id"] in ("CPlower", "CPright"):
        return CONTRACTION_INTENSITY
    if state["id"] == "contraction-part" and action["id"] in ("CPleft",):
        return CONTRACTION_CONSTIPATION
    if state["id"] == "contraction-constipation" and action["id"] == "CCyes":
        return CONTRACTION_OTHER_CAUSE
    if state["id"] == "contraction-constipation" and action["id"] == "CCno":
        return CONTRACTION_INTENSITY
    if state["id"] == "contraction-intensity" and action["id"] in ("CI1", "CI2"):
        return NATURAL_WATCH
    if state["id"] == "contraction-intensity" and action["id"] in ("CI3",):
        return CONTRACTION_FREQUENCY_FIRST
    if state["id"] == "contraction-intensity" and action["id"] in ("CI4", "CI5", "CI6"):
        return VISIT_DU
    if state["id"] == "contraction-frequency-first" and action["id"] == "CFF1":
        return NATURAL_WATCH
    if state["id"] == "contraction-frequency-first" and action["id"] == "CFF2":
        return CONTRACTION_FREQUENCY_SECOND
    if state["id"] == "contraction-frequency-second" and action["id"] == "CFS1":
        return VISIT_DU
    if state["id"] == "contraction-frequency-second" and action["id"] == "CFS2":
        return NATURAL_WATCH

    # Morning
    if state["id"] == "init-question" and action["id"] == "morning":
        return MORNING_STATUS
    if state["id"] == "morning-status" and action["id"] in ("MNS1", "MNS2"):
        return MORNING_CARE
    if state["id"] == "morning-status" and action["id"] in (
        "MNS3",
        "MNS4",
        "MNS5",
        "MNS6",
    ):
        return OPD_EARLY

    # Ending
    if state["id"] == "ending" and action["id"] == "EDfreeform":
        return ENDING_FREEFORM
    if state["id"] == "ending" and action["id"] == "EDquit":
        return TERMINATE
    if state["id"] == "ending-freeform" and action["id"] == "freeform-answer":
        return TERMINATE

    return {**message_base, "message": "오류가 발생했습니다."}


def reducer(dialogs, action):
    context = context_from_dialogs(dialogs)
    state = state_from_dialogs(dialogs)

    next_response = next_bot_response(state, action, context)

    next_dialogs = [
        *context,
        deactivate_question(state, action),
        {
            "type": "message",
            "authorType": "self",
            "nick": "회원님",
            "message": action["value"],
        },
        next_response,
    ]
    if next_response["type"] == "message" and next_response["id"] != "terminate":
        next_dialogs.append(ENDING)

    if next_response["id"] == "terminate":
        next_input = "init"
    elif next_response["id"] == "ending-freeform":
        next_input = "freeform"
    else:
        next_input = "disable"

    print(next_dialogs)

    return {
        "dialogs": next_dialogs,
        "input": next_input,
    }
