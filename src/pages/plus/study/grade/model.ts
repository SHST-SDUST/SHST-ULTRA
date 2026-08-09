import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToGrades } from "./parser";

export type QueryTerms = { show: string; value: string }[];

export type GradeType = {
  credit: string;
  gpa: string;
  grade: string;
  makeup: string;
  minor: string;
  name: string;
  no: string;
  rebuild: string;
  type: string;
};

export const INIT_QUERY_TERMS: QueryTerms = [
  { show: "", value: "" },
  { show: "请稍后", value: "" },
];

export const requestForGrade = (term: string): Promise<GradeType[]> => {
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "POST",
    url: SW_HOST + "kbxx/jsjy_query2",
    data: {
      kksj: term === "all" ? "" : term,
      pageNum: 1,
      pageSize: 999,
      xsfs: "all",
      kcxz: "",
      kcsx: "",
      kcmc: "",
      sfxsbcxq: 1,
    },
  }).then(res => {
    return htmlToGrades(res.data);
  });
};
