import { RegExec as R } from "@/utils/regex";

import type { CreditItem, DetailItem, TypedItem } from "./model";

export const htmlToSituation = (html: string) => {
  const credit: CreditItem[] = [];
  const typed: TypedItem[] = [
    {
      type: "-",
      need: "-",
      finish: "-",
      undo: "-",
      doing: "-",
    },
  ];
  const detail: DetailItem[] = [];

  let body = R.exec(/<body class=[^>]*>([\s\S]*?)<\/body>/, html);
  body = body.replace(/>\s+</g, "><");
  body = body.replace(/<\/?span[^>]*>/g, "");

  const table1 = R.exec(/<div class="mod-curriculum-[^>]*>([\s\S]*?)<div class="mod-item-/, body);
  const tds1 = R.match(/<div class="list-td.[^>]*>([\s\S]*?)<\/div>/g, table1);

  for (let i = 0; i < tds1.length; i += 4) {
    credit.push({
      type: tds1[i] || "",
      need: tds1[i + 1] || "",
      finish: tds1[i + 2] || "",
      undo: "-",
      doing: tds1[i + 3] || "",
    });
  }

  const fragments = body.split("mod-item-detail box-shadow");
  fragments.shift();
  const table2 = fragments.join("; ");
  const tds2 = R.match(/<div class="list-td.[^>]*>([\s\S]*?)<\/div>/g, table2);

  for (let i = 0; i < tds2.length; i += 10) {
    let creditValue = tds2[i + 3] || "";
    creditValue = creditValue.split(/[(（]/)[0].trim();
    detail.push({
      name: tds2[i + 2] || "",
      no: tds2[i + 1] || "",
      credit: creditValue,
      grade: tds2[i + 7] || "-",
      type: `${tds2[i + 5]}(${tds2[i + 4]}-${tds2[i + 6]})` || "",
    });
  }

  return { credit, typed, detail };
};
