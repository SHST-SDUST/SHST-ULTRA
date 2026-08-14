import type { CourseTableItem } from "@/components/course-table/types";

const P: string = "|-|";
const UNION: string = "xm";
type R = Record<string, number>;
const S: R = { "1-2": 0, "3-4": 1, "5-6": 2, "7-8": 3, "9-10": 4 };
const D: R = { 星期一: 0, 星期二: 1, 星期三: 2, 星期四: 3, 星期五: 4, 星期六: 5, 星期日: 6 };

export const htmlToCourses = (text: string): Record<string, CourseTableItem[]> => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  const result: Record<string, CourseTableItem[]> = {};
  const group: Record<string, CourseTableItem> = {};
  for (const item of json.data) {
    const day = D[item.zzdweek];
    const serial = S[item.jc];
    const key = `${day}${P}${serial}${P}${item[UNION]}`;
    if (!group[key]) {
      group[key] = { weekDay: day, serial, data: [] };
    }
    group[key].data.push([item.kcmc, item.jsmc, item.kkzc + "周", item.ktmc]);
  }
  for (const [key, value] of Object.entries(group)) {
    const [, , union] = key.split(P);
    result[union] = result[union] || [];
    result[union].push(value);
  }
  return result;
};
