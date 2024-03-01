import { App } from "@/utils/app";
import { CACHE, SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

import { htmlToTable, type TableCache, type TableData } from "./parser";

export const requestRemoteTimeTable = (throttle = false): Promise<TableData | null> => {
  return HTTP.request<string>({
    load: 2,
    throttle: throttle,
    url: SW_HOST + "xskb/xskb_list.do",
    data: {
      week: App.data.curWeek,
      term: App.data.curTerm,
    },
  }).then(res => {
    try {
      const table = htmlToTable(res.data);
      const key = CACHE.PLUS_TABLE;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
      return table;
    } catch (e) {
      Toast.info("解析失败");
      return null;
    }
  });
};

export const requestTimeTable = (cache = true, throttle = false): Promise<TableData | null> => {
  const key = CACHE.PLUS_TABLE;
  if (!cache) return requestRemoteTimeTable(throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE WEEK");
      return data.data;
    } else {
      return requestRemoteTimeTable(throttle);
    }
  });
};
