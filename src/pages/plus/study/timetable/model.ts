import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

import type { RemoteTable, TableCache, TableData } from "./parser";

export const requestRemoteTimeTable = (
  week: number,
  throttle = false
): Promise<TableData | null> => {
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
