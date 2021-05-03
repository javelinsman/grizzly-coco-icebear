export interface MessageDialog {
  id: string;
  type: "message";
  authorType: "self" | "other";
  nick: string;
  message: string;
}

export interface SelectionDialog {
  id: string;
  type: "selection";
  authorType: "self" | "other";
  nick: string;
  message: string;
  options: {id: string, value: string}[];
  selected: string;
  active: boolean;
}

export type Dialog = MessageDialog | SelectionDialog;

export interface DialogState {
  dialogs: Dialog[];
  fetching: "none" | "fetching" | "done";
}