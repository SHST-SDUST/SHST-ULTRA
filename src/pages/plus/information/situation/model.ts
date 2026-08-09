import { SW_HOST } from "@/utils/constant";
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
    load: 2,
    method: "GET",
    url: SW_HOST + "xxwcqk/xxwcqkOnkcxz.do",
    data: {
      isdb: "0",
    },
  }).then(res => {
    return htmlToSituation(res.data);
  });
};
