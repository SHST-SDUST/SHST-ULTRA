/* eslint-disable no-useless-escape */
/* eslint-disable no-irregular-whitespace */
import { RegExec as R } from "../src/utils/regex";

const html = ``;

type Course = { day: number; serial: number; data: string[] };
const courses: Record<string, Course[]> = {};
const content = R.exec(/<table[\s]*id="kbtable"[\s\S]*?>([\s\S]*?)<\/table>/g, html);
const group = R.match(
  /<tr[\s\S]*?>([\s\S]*?)<\/tr>/g,
  content
    .replace(/&nbsp;/g, "")
    .replace(/[\n\t]/g, "")
    .replace(/<nobr>\s?/g, "")
    .replace(/<\/nobr>/g, "")
);
group.forEach((item, index) => {
  if (index < 2) return void 0;
  const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
  if (!data[0]) return void 0;
  const row: Course[] = [];
  courses[data[0]] = row;
  data.forEach((it, k) => {
    if (k === 0 || !it) return void 0;
    const day = Math.floor((k - 1) / 5);
    const serial = Math.floor((k - 1) % 5) + 1;
    const match = R.exec(/<div id='' class="kbcontent1">([\s\S]*?)<\/div>/, it);
    row.push({ day, serial, data: match.split(/<\/?br>/) });
  });
});
console.log("courses :>> ", JSON.stringify(courses));
