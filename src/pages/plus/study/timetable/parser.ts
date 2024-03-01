import type { TimeTableItem, TimeTableType } from "@/components/time-table/types";
import { App } from "@/utils/app";
import { DateTime } from "@/utils/datetime";
import { RegExec as R } from "@/utils/regex";

export type RemoteTableInfo = Array<{
  day: number;
  serial: number;
  name: string;
  weeks: string[];
  teacher: string;
  weeks_raw: string;
  classroom: string;
}>;

export type TableData = RemoteTableInfo;
export type TableCache = { data: RemoteTableInfo; term: string };

export const parseTimeTable = (
  data: RemoteTableInfo,
  week?: number,
  today?: boolean
): TimeTableType => {
  const timeTable: Array<TimeTableItem> = [];
  const curWeek = week || App.data.curWeek;
  const colorList = App.data.colorList;
  const currentDay = (new DateTime().getDay() || 7) - 1;
  const checkIsCurrentWeek = (weeks: string[]) => {
    const decideCurWeek = (str: string): boolean => {
      const [start, end] = str.split("-").map(v => Number(v) >> 0);
      for (let i = start; i <= end; ++i) {
        if (curWeek === i) return true;
      }
      return false;
    };
    for (let i = 0, n = weeks.length; i < n; ++i) {
      const str = weeks[i];
      if (/^\d+-\d+$/.test(str)) {
        if (decideCurWeek(str)) return true;
      } else if (/^\d+-\d+\/[12]$/.test(str)) {
        const type = Number(str.slice(-1));
        if (type % 2 !== curWeek % 2) continue;
        if (decideCurWeek(str.replace(/\/\d/, ""))) return true;
      } else if (/^\d+$/.test(str)) {
        if (Number(str) >> 0 === curWeek) return true;
      }
    }
    return false;
  };
  data.forEach(value => {
    if (!value) return void 0;
    const day = value.day;
    const serial = value.serial;
    if (today && day !== currentDay) return void 0;
    const item: TimeTableItem = {
      weekDay: day,
      serial,
      className: value.name,
      classRoom: value.classroom,
      teacher: value.teacher,
      ext: value.weeks_raw,
      background: "#CCC",
      isCurWeek: checkIsCurrentWeek(value.weeks),
    };
    if (today && !item.isCurWeek) return void 0;
    if (item.isCurWeek) {
      const uniqueNum = value.name.split("").reduce((pre, cur) => pre + cur.charCodeAt(0), 0);
      const background = colorList[uniqueNum % colorList.length];
      item.background = background;
    }
    timeTable.push(item);
  });
  return timeTable;
};

export const htmlToTable = (html: string) => {
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
  return table;
};
