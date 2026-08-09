import { DateTime } from "@/utils/datetime";

export const QUERY_DATA = (() => {
  const weekShow = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const date = new DateTime();
  const year = date.getFullYear();
  const week = date.getDay();
  const queryData: [string, string][] = [];
  for (let i = 0; i < 100; ++i) {
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    const weekTemp = week + i;
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const formatDate = year + "-" + month + "-" + day;
    queryData.push([`${month}-${day} ` + weekShow[weekTemp % 7], formatDate]);
    date.nextDay();
  }
  return queryData;
})();

export const QUERY_CAMPUS: [string, string][] = [
  ["青岛校区", "1"],
  ["泰安校区", "2"],
  ["济南校区", "3"],
];

export const NOW = new DateTime().format();
