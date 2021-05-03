import { useSelector } from "react-redux";
import { AuthState } from "./auth-state";
import { DialogState } from "./dialog-state";

export interface RootState {
  auth: AuthState
  dialogs: DialogState
}

export function useRootSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
