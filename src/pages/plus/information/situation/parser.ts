import { RegExec as R } from "@/utils/regex";

import type { CreditItem, DetailItem, TypedItem } from "./model";

export const htmlToSituation = (html: string) => {
  const credit: CreditItem[] = [];
  const typed: TypedItem[] = [];
  const detail: DetailItem[] = [];
  const text = html
    .replace(/&nbsp;/g, "")
    .replace(/<b>/g, "")
    .replace(/<\/b>/g, "")
    .replace(/<font[\s\S]*?>/g, "")
    .replace(/<\/font>/g, "");
  const typedOrigin = R.exec(/<table[\s\S]*?class="tableCss"[\s\S]*?>([\s\S]*?)<\/table>/g, text);
  const content = R.match(/<table[\s\S]*?class="Nsb_r_list Nsb_table">([\s\S]*?)<\/table>/g, text);
  const creditOrigin = content[0] || "";
  const detailOrigin = content[1] || "";
  const typedRow = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, typedOrigin);
  const creditRow = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, creditOrigin);
  const detailRow = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, detailOrigin);
  typedRow.forEach((row, index) => {
    if (index === 0) return void 0;
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td[\s\S]*?>/, row);
    typed.push({
      type: data[0],
      need: data[1],
      finish: data[2],
      undo: data[3],
      doing: data[4],
    });
  });
  creditRow.forEach(row => {
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td[\s\S]*?>/, row);
    if (!data[0]) return void 0;
    credit.push({
      type: data[0],
      need: data[1],
      finish: data[2],
      undo: data[3],
      doing: data[4],
    });
  });
  detailRow.forEach(row => {
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td[\s\S]*?>/, row);
    if (!data[0] || !data[1]) return void 0;
    detail.push({
      no: data[0],
      name: data[1],
      credit: data[2],
      type: data[3],
      grade: data[4],
    });
  });
  return { credit, typed, detail };
};
