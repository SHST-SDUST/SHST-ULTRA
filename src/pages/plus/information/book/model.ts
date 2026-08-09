import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToBooks } from "./parser";

export type QueryTerms = { show: string; value: string }[];

export type BookItem = {
  bookName: string;
  no: string;
  isbn: string;
  publisher: string;
  publishTime: string;
  className: string;
  type: string;
  count: string;
  author: string;
};

export const INIT_QUERY_TERMS: QueryTerms = [{ show: "请稍后", value: "" }];

export const requestForBook = (term: string): Promise<BookItem[] | null> => {
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "GET",
    url: SW_HOST + "jcgl/bjjcdg_query",
    data: {
      xnxqid: term,
      reqType: "listData",
      pageNum: 1,
      pageSize: 999,
    },
  }).then(res => {
    return htmlToBooks(res.data);
  });
};
