import type { PlanItem } from "../src/pages/plus/information/plan/model";
import { RegExec as R } from "../src/utils/regex";

const html = ``;

const plans: PlanItem[] = [];
const content = R.exec(/<table[\s]*id="dataList"[\s\S]*?>([\s\S]*?)<\/table>/g, html);
const group = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, content);
group.forEach(item => {
  const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
  if (!data[2]) return void 0;
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
console.log("plans :>> ", plans);
