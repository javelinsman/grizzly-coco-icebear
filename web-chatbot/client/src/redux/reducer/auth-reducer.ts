import { getType } from "typesafe-actions";
import { ReducibleAction } from "../action/root-action";
import { AuthState } from "../state/auth-state";

const defaultAuthState: AuthState = {
  encryptedPk: "",
  fetching: "none",
};

export const authReducer = (
  state: AuthState = defaultAuthState,
  action: ReducibleAction
): AuthState => {
  switch (1) {
    // case getType():
    //   asdf
    default:
      return state;
  }
};
