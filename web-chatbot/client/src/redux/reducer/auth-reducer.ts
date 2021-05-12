import { getType } from "typesafe-actions";
import { actionAuth } from "../action/auth-action";
import { ReducibleAction } from "../action/root-action";
import { AuthState } from "../state/auth-state";

const defaultAuthState: AuthState = {
  encryptedPk: "",
};

export const authReducer = (
  state: AuthState = defaultAuthState,
  action: ReducibleAction
): AuthState => {
  switch (action.type) {
    case getType(actionAuth.setEncryptedPK):
      const { encryptedPk } = action.payload;
      return {
        ...state, encryptedPk
      }
    default:
      return state;
  }
};
