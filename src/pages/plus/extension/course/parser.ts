import type { CourseTableItem } from "@/components/course-table/types";
import { RegExec as R } from "@/utils/regex";

export const htmlToCourses = (html: string) => {
  const courses: Record<string, CourseTableItem[]> = {};
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
    const row: CourseTableItem[] = [];
    courses[data[0]] = row;
    data.forEach((it, k) => {
      if (k === 0 || !it) return void 0;
      const day = Math.floor((k - 1) / 5);
      const serial = Math.floor((k - 1) % 5) + 1;
      const list = R.match(/<div id='' class="kbcontent1">([\s\S]*?)<\/div>/g, it);
      const unit = list.map(iter => iter.split(/<\/?br>/));
      row.push({ weekDay: day, serial, data: unit });
    });
  });
  return courses;
};
