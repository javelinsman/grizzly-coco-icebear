import { Dispatch } from "react";
import { useDispatch } from "react-redux";


export type ReducibleAction = any;
//  | BirthActionReducible
//  | RouteActionReducible
//  | ARFActionReducible
//  | BPActionReducible;

export type DispatchableAction = any;
//  | BirthActionDispatchable
//  | RouteActionDispatchable
//  | ARFActionDispatchable
//  | BPActionDispatchable;

type CustomDispatch = Dispatch<DispatchableAction>;
export const useThunkDispatch = () => useDispatch<CustomDispatch>();
