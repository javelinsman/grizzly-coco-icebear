import moment from "moment";
import Axios from "axios";

import { Dialog } from "../state/dialog-state";

const baseUrl = "http://147.46.241.199:8116/";

export async function loadDialogs(encryptedPk: string) {
  const r = await Axios.get<{ dialogs: Dialog[]; input: any }>(
    baseUrl + `chatbot/load?encryptedPk=${encryptedPk}`
  );
  return r.data;
}

export async function postUserAction(
  encryptedPk: string,
  state: Dialog[],
  action: { id: string; value: string }
) {
  const r = await Axios.post<{ dialogs: Dialog[]; input: any }>(
    baseUrl + `chatbot/next/`,
    { encryptedPk, state, action }
  );
  return r.data;
}

// export async function postQuery(description: string) {
//   // console.log(process.env);
//   // console.log("baseUrl: " + baseUrl);
//   const r = await Axios.post<IssueQuery>(baseUrl + "query/", {
//     description,
//   });
//   return r.data;
// }
