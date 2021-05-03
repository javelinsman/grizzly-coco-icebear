import moment from "moment";
import Axios from "axios";

import { Dialog } from "../state/dialog-state";

const baseUrl = "http://147.46.241.199:8116";

export async function loadDialogs() {
  return [
    { type: "message", authorType: "other", nick: "알러뷰봇", message: "안녕하세요", },
    { type: "selection", authorType: "other", nick: "알러뷰봇", message: "123", options: ["1", "2", "3"], selected: null, active: false },
    { type: "message", authorType: "self", nick: "회원님", message: "2", },
    { type: "selection", authorType: "other", nick: "알러뷰봇", message: "123", options: ["1", "2", "3"], selected: null, active: true },
  ] as Dialog[];
  // const r = await Axios.get<IssueQuery>(baseUrl + `query/${issueQueryId}`);
  // return r.data;
}

// export async function postQuery(description: string) {
//   // console.log(process.env);
//   // console.log("baseUrl: " + baseUrl);
//   const r = await Axios.post<IssueQuery>(baseUrl + "query/", {
//     description,
//   });
//   return r.data;
// }