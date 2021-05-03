import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AuthActionDispatchable, AuthActionReducible } from "./auth-action";
import {
  DialogActionDispatchable,
  DialogActionReducible,
} from "./dialog-action";

export type ReducibleAction = AuthActionReducible | DialogActionReducible;

export type DispatchableAction =
  | AuthActionDispatchable
  | DialogActionDispatchable;

type CustomDispatch = Dispatch<DispatchableAction>;
export const useThunkDispatch = () => useDispatch<CustomDispatch>();
