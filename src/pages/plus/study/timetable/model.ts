import { App } from "@/utils/app";
import { CACHE, SW_HOST } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { isNil } from "@/utils/is";
import { Report } from "@/utils/report";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

import { htmlToTable, type TableCache, type TableData } from "./parser";

export const requestRemoteTimeTable = (
  throttle = false,
  options: {
    load?: number;
  } = {}
): Promise<TableData | null> => {
  return HTTP.request<string>({
    load: isNil(options.load) ? 2 : options.load,
    throttle: throttle,
    method: "POST",
    url: SW_HOST + "xskb/xskb_list.do",
    data: {
      xnxq01id: App.data.curTerm,
      sfFD: 1,
      viweType: 0,
      showallprint: 0,
      showkchprint: 0,
      showkink: 0,
      showfzmprint: 0,
      baseUrl: "/jsxsd",
      xsflMapListJsonStr: encodeURIComponent("讲课学时,实践学时,实验学时,上机学时,课内实践学时"),
    },
  }).then(res => {
    try {
      const table = htmlToTable(res.data);
      if (table.length === 0) {
        // 由于评教未完成导致解析内容为空
        if (res.data.indexOf("评教未完成") > -1) {
          Toast.info("评教未完成，请先至强智完成评教后重试");
          return [];
        }
        // 密码过于简单也会导致解析内容为空
        if (res.data.indexOf("密码过于简单") > -1) {
          Toast.info("密码过于简单，请至教务系统修改密码");
          return [];
        }
        // 系统登录状态可能会失效
        if (res.data.indexOf("欢迎登录教务系统") > -1 || res.data.indexOf("请先登录系统") > -1) {
          Toast.info("登录状态失效，请重新登录");
          return [];
        }
        // 记录日志排查问题
        const fragments = res.data.split("<tbody");
        const content = fragments.length > 1 ? fragments[1] : "";
        const cleanContent = content.replace(/[\r\n\t]/g, "");
        Report.info(App.data.account, cleanContent);
      }
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
      syncTimeTableCache();
      return data.data;
    } else {
      keepTimeTableCache();
      return requestRemoteTimeTable(throttle);
    }
  });
};

/**
 * 保持时间表缓存, 过期时间为下一天
 */
export const keepTimeTableCache = async () => {
  const key = CACHE.TIMETABLE_CACHE_ASYNC;
  const now = new DateTime();
  const nextDay = now.nextDay();
  return LocalStorage.setPromise(key, true, nextDay);
};

/** 标记课表同步中 */
let isSyncing = false;

/**
 * 同步课表缓存
 */
export const syncTimeTableCache = async () => {
  if (!App.data.isULTRALogin || isSyncing) return;
  const now = new DateTime();
  const hour = now.getHours();
  // 7 - 12 点之间不同步缓存数据
  if (6 < hour && hour < 12) return;
  const key = CACHE.TIMETABLE_CACHE_ASYNC;
  const cached = await LocalStorage.getPromise<boolean>(key);
  if (cached || isSyncing) return;
  isSyncing = true;
  await keepTimeTableCache();
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log("START SYNC TIME-TABLE CACHE");
  // 同步缓存数据 函数内部会写缓存
  await requestRemoteTimeTable(false, { load: -1 });
  isSyncing = false;
};
