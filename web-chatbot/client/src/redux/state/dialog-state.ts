export interface MessageDialog {
  type: "message";
  authorType: "self" | "other";
  nick: string;
  message: string;
}

export interface SelectionDialog {
  type: "selection";
  authorType: "self" | "other";
  nick: string;
  message: string;
  options: string[];
  selected: string;
  active: boolean;
}

export type Dialog = MessageDialog | SelectionDialog;

export interface DialogState {
  dialogs: Dialog[];
  fetching: "none" | "fetching" | "done";
}