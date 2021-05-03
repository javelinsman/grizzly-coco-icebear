import { createAction } from "typesafe-actions";
import { makeThunk } from "./utils";
// import { getQuery, getRecentIssueQueries, postQuery } from "./api/api";

const unitActions = {
  fetchEncryptedPK: createAction("AUTH/FETCH_ENCRYPTED_PK", () => {})(),
};

const thunkActions = {
  // get: makeThunk(
  //   "QUERY/GET/fetch",
  //   "QUERY/GET/complete",
  //   (issueQueryId: number) => ({
  //     request: { issueQueryId },
  //     response: () => getQuery(issueQueryId),
  //   })
  // ),
};

type ThunkActionObject = typeof thunkActions;
type UnitActionObject = typeof unitActions;
type ThunkAction = ThunkActionObject[keyof ThunkActionObject];
type UnitAction = UnitActionObject[keyof UnitActionObject];

export const actionAuth = { ...thunkActions, ...unitActions };
export type AuthActionReducible = ReturnType<
  ThunkAction["fetch"] | ThunkAction["complete"] | UnitAction
>;
export type AuthActionDispatchable = ReturnType<
  ThunkAction["thunk"] | UnitAction
>;