import type { TimeTableItem, TimeTableType } from "@/components/time-table/types";
import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

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

export const parseTimeTable = (data: RemoteTableInfo, week?: number): TimeTableType => {
  const timeTable: Array<TimeTableItem> = [];
  const curWeek = week || App.data.curWeek;
  const colorList = App.data.colorList;
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

export const requestRemoteTimeTable = (
  week: number,
  throttle = false
): Promise<TableData | null> => {
  if (!App.data.isSHSTLogin) return Promise.resolve(null);
  console.log("GET TABLE FROM REMOTE WEEK", week);
  let urlTemp = "";
  if (typeof week === "number") urlTemp += "/" + week;
  return HTTP.request<RemoteTable>({
    load: 2,
    throttle: throttle,
    url: App.data.url + "/plus/table" + urlTemp,
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    if (res.data.status === 1) {
      const data = res.data;
      const table = data.info.filter(Boolean);
      const key = CACHE.PLUS_TABLE;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
      return { info: table, week: res.data.week };
    } else {
      return null;
    }
  });
};

export const requestTimeTable = (
  week: number,
  cache = true,
  throttle = false
): Promise<TableData | null> => {
  const key = CACHE.PLUS_TABLE;
  if (!cache) return requestRemoteTimeTable(week, throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE WEEK", week);
      return { info: data.data, week: week };
    } else {
      return requestRemoteTimeTable(week, throttle);
    }
  });
};
