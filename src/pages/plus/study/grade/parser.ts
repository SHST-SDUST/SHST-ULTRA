import { RegExec as R } from "@/utils/regex";

import type { GradeType } from "./model";

export const htmlToGrades = (html: string) => {
  const grades: GradeType[] = [];
  const content = R.exec(/<table[\s]*id="dataList"[\s\S]*?>([\s\S]*?)<\/table>/g, html);
  const group = R.match(/<tr[\s\S]*?>([\s\S]*?)<\/tr>/g, content);
  group.forEach(item => {
    const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/g, item);
    if (!data[2]) return void 0;
    grades.push({
      no: data[2],
      name: data[3],
      grade: data[4],
      makeup: data[5],
      rebuild: data[6],
      type: data[7],
      credit: data[8],
      gpa: data[9],
      minor: data[10],
    });
  });
  return grades;
};
