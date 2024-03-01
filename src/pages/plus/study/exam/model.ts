import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToExams } from "./parser";

export type QueryTerms = { show: string; value: string }[];

export type ExamType = {
  name: string;
  no: string;
  classroom: string;
  location: string;
  time: string;
};

export const INIT_QUERY_TERMS: QueryTerms = [{ show: "请稍后", value: "" }];

export const requestForExam = (term: string): Promise<ExamType[] | null> => {
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "POST",
    url: SW_HOST + "xsks/xsksap_list",
    data: {
      xnxqid: term,
      xqlbmc: "",
      xqlb: "",
    },
  }).then(res => {
    return htmlToExams(res.data);
  });
};
