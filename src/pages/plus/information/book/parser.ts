import { RegExec as R } from "@/utils/regex";

import type { BookItem } from "./model";

export const htmlToBooks = (html: string) => {
  const books: BookItem[] = [];
  const content = R.exec(/<table[\s\S]*?class="Nsb_r_list Nsb_table">([\s\S]*?)<\/table>/g, html);
  const group = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, content);
  group.forEach(item => {
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
    if (!data[1]) return void 0;
    books.push({
      no: data[0],
      classname: data[1],
      type: data[2],
      book_name: data[3],
      publisher: data[4],
      author: data[5],
      isbn: data[6],
      publish_time: data[7],
      nums: data[9],
    });
  });
  return books;
};
