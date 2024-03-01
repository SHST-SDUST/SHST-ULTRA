import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToBooks } from "./parser";

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
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "POST",
    url: SW_HOST + "jcgl/bjjcdg",
    data: {
      xnxqid: term,
      xqlbmc: "",
    },
  }).then(res => {
    return htmlToBooks(res.data);
  });
};
