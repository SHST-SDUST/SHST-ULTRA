/* eslint-disable no-irregular-whitespace */
import type { RemoteTableInfo } from "../src/pages/plus/study/timetable/parser";
import { RegExec as R } from "../src/utils/regex";

const html = ``;

const table: RemoteTableInfo = [];
const classes = R.match(/<div[\s\S]*?class="kbcontent"[\s]?>(.*?)<\/div>/g, html);
classes.forEach((item, index) => {
  const repeat = item.split(/-{10,}/g);
  const day = index % 7;
  const serial = Math.floor(index / 7);
  for (const value of repeat) {
    if (value.startsWith("&nbsp;")) continue;
    const nameGroup = value.split(/(<\/br>)|(<br\/>)/g);
    const name = R.get(nameGroup, 0).replace("<br>", "").replace(/[（]/g, "(").replace("）", ")");
    const teacher = R.get(R.exec(/<font[\s\S]*?title='老师'[\s\S]*?>(.*?)<\/font>/g, value), 1);
    const weekStr = R.get(
      R.exec(/<font[\s\S]*?title='周次\(节次\)'[\s\S]*?>(.*?)<\/font>/g, value),
      1
    )
      .replace(/[,=\\]/g, ",")
      .replace(/[（]/g, "(")
      .replace("）", ")");
    const weeks_raw = weekStr.replace(/[()]/g, "");
    const weeks: string[] = []; // 三种模式 \d+-\d+ \d+ \d+-\d+\/[12]
    for (const week of weekStr.split(",")) {
      let weekItem = "";
      if (week.indexOf("单周") > -1) weekItem = "/1";
      else if (week.indexOf("双周") > -1) weekItem = "/2";
      weekItem = week.replace(/[单双()周]/g, "") + weekItem;
      weeks.push(weekItem);
    }
    const classroom = R.get(R.exec(/<font[\s\S]*?title='教室'[\s\S]*?>(.*?)<\/font>/g, value), 1);
    table.push({
      day,
      serial,
      name,
      teacher,
      classroom,
      weeks,
      weeks_raw,
    });
  }
});
console.log("table :>> ", table);
