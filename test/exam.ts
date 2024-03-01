import type { ExamType } from "../src/pages/plus/study/exam/model";
import { RegExec as R } from "../src/utils/regex";

const html = ``;

const exams: ExamType[] = [];
const content = R.exec(/<table[\s]*id="dataList"[\s\S]*?>([\s\S]*?)<\/table>/g, html);
const group = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, content);
group.forEach(item => {
  const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
  if (!data[2]) return void 0;
  exams.push({
    no: data[2],
    name: data[3],
    time: data[4],
    classroom: data[5],
    location: data[6],
  });
});
console.log("exams :>> ", exams);
