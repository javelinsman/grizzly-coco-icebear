import moment from "moment";
import Axios from "axios";

import { Dialog } from "../state/dialog-state";

const baseUrl = "http://147.46.241.199:8116/";

export async function loadDialogs() {
  const r = await Axios.get<Dialog[]>(baseUrl + `chatbot/load/`);
  return r.data;
}

export async function postUserAction(state: Dialog[], action: string) {
  const r = await Axios.post<Dialog[]>(baseUrl + `chatbot/next/`, { state, action });
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
