import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToExams, htmlToExams2 } from "./parser";

export type QueryTerms = { show: string; value: string }[];

export type ExamType = {
  name: string;
  no: string;
  classroom: string;
  location: string;
  time: string;
};

export const INIT_QUERY_TERMS: QueryTerms = [{ show: "请稍后", value: "" }];

export const requestForExam = async (term: string): Promise<ExamType[] | null> => {
  const res1 = await HTTP.request<string>({
    load: 2,
    throttle: false,
    method: "POST",
    url: SW_HOST + "xsks/xsstk_list",
    data: {
      xnxqid: term,
      pageNum: 1,
      pageSize: 999,
      kslb: "",
    },
  }).then(res => {
    return htmlToExams(res.data);
  });
  const res2 = await HTTP.request<string>({
    load: 2,
    throttle: false,
    method: "POST",
    url: SW_HOST + "xsks/xsksap_list",
    data: {
      xnxqid: term,
      pageNum: 1,
      pageSize: 999,
      xqlb: "",
    },
  }).then(res => {
    return htmlToExams2(res.data);
  });
  return [...res1, ...res2];
};
