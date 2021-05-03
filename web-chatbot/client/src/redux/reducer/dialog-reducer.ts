import { getType } from "typesafe-actions";
import { actionDialog } from "../action/dialog-action";
import { ReducibleAction } from "../action/root-action";
import { DialogState } from "../state/dialog-state";

const defaultDialogState: DialogState = {
  dialogs: [],
  fetching: "none",
  input: "freeform",
};

export const dialogReducer = (
  state: DialogState = defaultDialogState,
  action: ReducibleAction
): DialogState => {
  switch (action.type) {
    case getType(actionDialog.load.fetch):
      return { ...state, fetching: "fetching" };
    case getType(actionDialog.load.complete): {
      const { dialogs, input } = action.payload;
      return { ...state, dialogs, input, fetching: "done" };
    }
    // case getType(actionDialog.next.fetch):
    case getType(actionDialog.next.complete): {
      const { dialogs, input } = action.payload;
      return { ...state, dialogs, input };
    }
    default:
      return state;
  }
};
