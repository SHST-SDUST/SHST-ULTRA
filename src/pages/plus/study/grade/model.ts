import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

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

export const requestForGrade = (term: string): Promise<GradeType[] | null> => {
  const query = term === "" ? "" : "/" + term;
  return HTTP.request<{ info: GradeType[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/plus/grade" + query,
  }).then(res => {
    const data = res.data.info;
    if (data) return data;
    return null;
  });
};
