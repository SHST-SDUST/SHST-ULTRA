import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

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
  const query = term === "" ? "" : "/" + term;
  return HTTP.request<{ info: ExamType[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/plus/exam" + query,
  }).then(res => {
    const data = res.data.info;
    if (data) return data;
    return null;
  });
};
