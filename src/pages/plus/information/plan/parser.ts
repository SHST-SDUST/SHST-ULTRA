import { RegExec as R } from "@/utils/regex";

import type { PlanItem } from "./model";

export const htmlToPlans = (html: string) => {
  const plans: PlanItem[] = [];
  const content = R.exec(/<table[\s]*id="dataList"[\s\S]*?>([\s\S]*?)<\/table>/g, html);
  const group = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, content);
  group.forEach(item => {
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
    if (!data[0]) return void 0;
    plans.push({
      term: data[1],
      no: data[2],
      name: data[3],
      unit: data[4],
      credit: data[5],
      period: data[6],
      examine: data[7],
      type: data[8],
    });
  });
  return plans;
};
