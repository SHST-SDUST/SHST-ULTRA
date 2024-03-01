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
    url: SW_HOST + "kscj/cjcx_list_new",
    data: {
      kksj: term,
      xsfs: "all",
      showType: 2,
      kcxz: "",
      kcmc: "",
    },
  }).then(res => {
    return htmlToGrades(res.data);
  });
};
