import { SW_HOST } from "@/utils/constant";
import { RegExec as R } from "@/utils/regex";
import { HTTP } from "@/utils/request";

import { htmlToSituation } from "./parser";

export type CreditItem = {
  type: string;
  need: string;
  finish: string;
  undo: string;
  doing: string;
};

export type TypedItem = {
  type: string;
  need: string;
  finish: string;
  undo: string;
  doing: string;
};

export type DetailItem = {
  name: string;
  no: string;
  credit: string;
  grade: string;
  type: string;
};

export const requestForSituation = () => {
  return HTTP.request<string>({
    load: 3,
    url: SW_HOST + "xxwcqk/xxwcqk_idxOnxz.do",
  }).then(pre => {
    const html = pre.data;
    const ndzydm = R.exec(/<input[\s\S]*?name="ndzydm"[\s\S]*?value="(.*?)"\/>/, html);
    const jx0301zxjhid = R.exec(/<input[\s\S]*?name="jx0301zxjhid"[\s\S]*?value="(.*?)"\/>/, html);
    return HTTP.request<string>({
      load: 2,
      method: "POST",
      url: SW_HOST + "xxwcqk/xxwcqkOnkcxz.do",
      data: {
        ndzydm,
        jx0301zxjhid,
      },
    }).then(res => {
      return htmlToSituation(res.data);
    });
  });
};
