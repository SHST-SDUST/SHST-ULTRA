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
      } else if (/^\d+\/[12]$/.test(str)) {
        const sliceWeek = Number(str.slice(0, -2)) >> 0;
        if (sliceWeek === curWeek) return true;
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

  // 切分 tbody 后的内容
  const fragments = html.split("<tbody");
  const content = fragments.length > 1 ? fragments[1] : "";
  const cleanContent = content.replace(/[\r\n\t]/g, "");

  // 解析 tr 标签
  const trs = R.match(/<tr[^>]*>(.*?)<\/tr>/g, cleanContent);
  trs.forEach((tr, trIndex) => {
    // 查找所有 td 标签
    const tds = R.match(/<td[^>]*>(.*?)<\/td>/g, tr);
    tds.forEach((td, tdIndex) => {
      // 匹配 td 里的 ul 标签（qz-toolitiplists）
      const ul = R.exec(/<ul.*?class="qz-toolitiplists"[^>]*>(.*?)<\/ul>/g, td);
      if (!ul) return;
      // 匹配 li 标签组
      const lis = R.match(/<li[^>]*>(.*?)<\/li>/g, ul);
      lis.forEach(li => {
        let text = li.replace(/：/g, ":");
        text = text.replace(/<span>/g, "").replace(/<\/span>/g, "");

        const name = R.exec(/<div[^>]*>(.*?)<\/div>/g, text);
        const teacher = R.exec(/老师:(.*?)</g, text).trim();
        const classroom = R.exec(/地点:.*楼\((.*?)\)/g, text);
        let weekRaw = R.exec(/时间:(.*?)\[/g, text);
        weekRaw = weekRaw.replace(/[、=\\]/g, ",");
        const weeksRaw = weekRaw.replace(/[()（）]/g, "");
        const weeks: string[] = []; // 三种模式 \d+-\d+ \d+ \d+-\d+\/[12]
        const weekGroup = weekRaw.split(",");
        for (const week of weekGroup) {
          let str = "";
          if (week.indexOf("单周") > -1) str = "/1";
          else if (week.indexOf("双周") > -1) str = "/2";
          const weekItem = week.replace(/[单双()周]/g, "") + str;
          weeks.push(weekItem);
        }

        table.push({
          day: tdIndex - 1,
          serial: trIndex,
          name,
          teacher,
          weeks,
          classroom,
          weeks_raw: weeksRaw,
        });
      });
    });
  });

  return table;
};
