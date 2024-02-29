import type { TimeTableItem, TimeTableType } from "@/components/time-table/types";
import { App } from "@/utils/app";
import { DateTime } from "@/utils/datetime";

export type RemoteTableInfo = Array<{
  day: number;
  serial: number;
  name: string;
  weeks: string[];
  teacher: string;
  weeks_raw: string;
  classroom: string;
}>;

export type RemoteTable = { info: RemoteTableInfo; status: number; week: number };
export type TableData = Omit<RemoteTable, "status">;
export type TableCache = { data: RemoteTableInfo; term: string };

export const parseTimeTable = (
  data: RemoteTableInfo,
  week?: number,
  today?: boolean
): TimeTableType => {
  const timeTable: Array<TimeTableItem> = [];
  const curWeek = week || App.data.curWeek;
  const colorList = App.data.colorList;
  const currentDay = new DateTime().getDay() || 7;
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
    if (item.isCurWeek) {
      const uniqueNum = value.name.split("").reduce((pre, cur) => pre + cur.charCodeAt(0), 0);
      const background = colorList[uniqueNum % colorList.length];
      item.background = background;
    }
    timeTable.push(item);
  });
  return timeTable;
};

export const htmlToTable = (res: string) => {
  const table: RemoteTableInfo = [];
};
