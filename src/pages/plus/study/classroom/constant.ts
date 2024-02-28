import { DateTime } from "@/utils/datetime";

export const QUERY_DATA = (() => {
  const weekShow = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const date = new DateTime();
  const year = date.getFullYear();
  const week = date.getDay();
  const queryData: [string, string][] = [];
  for (let i = 0; i < 7; ++i) {
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    const weekTemp = week + i;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    queryData.push([year + "-" + month + "-" + day, weekShow[weekTemp % 7]]);
    date.nextDay();
  }
  return queryData;
})();

export const QUERY_TIME: [string, string, string][] = [
  ["12节", "0102", "12节(8:00-9:50)"],
  ["34节", "0304", "34节(10:10-12:00)"],
  ["56节", "0506", "56节(14:00-15:50)"],
  ["78节", "0708", "78节(16:00-17:50)"],
  ["9X节", "0910", "9X节(19:00-20:50)"],
];

export const QUERY_FLOOR: [string, string, number][] = [
  ["青-J1", "1", 1],
  ["青-J3", "3", 1],
  ["青-J5", "5", 1],
  ["青-J7", "7", 1],
  ["青-J14", "14", 1],
  ["青-S1", "S1", 1],
];

export const NOW = new DateTime().format();
