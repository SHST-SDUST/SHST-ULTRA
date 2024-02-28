import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

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
  return HTTP.request<{ info: { credit: CreditItem[]; typed: TypedItem[]; detail: DetailItem[] } }>(
    {
      load: 3,
      url: App.data.url + "/plus/CreditSituation",
    }
  ).then(res => {
    return res.data.info;
  });
};
