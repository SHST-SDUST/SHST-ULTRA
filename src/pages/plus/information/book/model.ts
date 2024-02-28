import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type QueryTerms = { show: string; value: string }[];

export type BookItem = {
  book_name: string;
  no: string;
  isbn: string;
  publisher: string;
  publish_time: string;
  classname: string;
  type: string;
  nums: string;
  author: string;
};

export const INIT_QUERY_TERMS: QueryTerms = [{ show: "请稍后", value: "" }];

export const requestForBook = (term: string): Promise<BookItem[] | null> => {
  const query = term === "" ? "" : "/" + term;
  return HTTP.request<{ info: BookItem[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/plus/teachBook" + query,
  }).then(res => {
    const data = res.data.info;
    if (data) return data;
    return null;
  });
};
