import type { BookItem } from "./model";

export const htmlToBooks = (text: string): BookItem[] => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  if (!json) {
    return [];
  }
  const books: BookItem[] = [];
  for (const value of json.data) {
    books.push({
      bookName: value.jcmc || "",
      no: value.kch || "",
      isbn: value.isbn || "",
      publisher: value.cbsmc || "",
      publishTime: value.cbsj || "",
      className: value.kcmc || "",
      type: value.dmmc || "",
      count: value.dgcs + "" || "",
      author: value.jczz || "",
    });
  }
  return books;
};
