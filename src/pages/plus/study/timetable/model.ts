import { App } from "@/utils/app";
import { CACHE, SW_HOST } from "@/utils/constant";
import { Report } from "@/utils/report";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

import { htmlToTable, type TableCache, type TableData } from "./parser";

export const requestRemoteTimeTable = (throttle = false): Promise<TableData | null> => {
  return HTTP.request<string>({
    load: 2,
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
      return data.data;
    } else {
      return requestRemoteTimeTable(throttle);
    }
  });
};
