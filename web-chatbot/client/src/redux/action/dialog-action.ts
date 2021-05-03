import { createAction } from "typesafe-actions";
import { loadDialogs } from "./api";
import { makeThunk } from "./utils";
// import { getQuery, getRecentIssueQueries, postQuery } from "./api/api";

const unitActions = {
  // addQueryView: createAction("QUERY/ADD_QUERY_VIEW", () => {})(),
};

const thunkActions = {
  load: makeThunk(
    "QUERY/LOAD/fetch",
    "QUERY/LOAD/complete",
    () => ({
      request: { },
      response: () => loadDialogs(),
    })
  ),
};

type ThunkActionObject = typeof thunkActions;
type UnitActionObject = typeof unitActions;
type ThunkAction = ThunkActionObject[keyof ThunkActionObject];
type UnitAction = UnitActionObject[keyof UnitActionObject];

export const actionDialog = { ...thunkActions, ...unitActions };
export type DialogActionReducible = ReturnType<
  ThunkAction["fetch"] | ThunkAction["complete"] | UnitAction
>;
export type DialogActionDispatchable = ReturnType<
  ThunkAction["thunk"] | UnitAction
>;