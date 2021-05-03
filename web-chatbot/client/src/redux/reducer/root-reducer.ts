import { combineReducers } from "redux";
import { RootState } from "../state/root-state";
import { authReducer } from "./auth-reducer";
import { dialogReducer } from "./dialog-reducer";

export const rootReducer = combineReducers<RootState>({
  auth: authReducer,
  dialogs: dialogReducer,
});