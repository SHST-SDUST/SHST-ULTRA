import type { RemoteTableInfo, TableCache } from "@/pages/plus/study/timetable/parser";
import { App } from "@/utils/app";
import { CACHE, CONFIG_URL, SW_HOST } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

export type SwiperItem = {
  img: string;
  url: string;
};

export type Config = {
  swiper: SwiperItem[];
  post: { title: string; link: string };
};

const DEFAULT_CONFIG: Config = {
  swiper: [
    {
      img: "http://dev.shst.touchczy.top/public/static/img/logo.jpg",
      url: "https://mp.weixin.qq.com/s/UnI25nELsIcGXn4EiySZqg",
    },
  ],
  post: {
    title: "山科小站常见问题",
    link: "https://mp.weixin.qq.com/s/UnI25nELsIcGXn4EiySZqg",
  },
};

export const requestRemoteConfig = () => {
  return LocalStorage.getPromise<Config>(CACHE.CONFIG).then(local => {
    if (local) return local;
    return HTTP.request<Config>({
      load: 0,
      url: CONFIG_URL,
    })
      .then(res => {
        const data = res.data;
        LocalStorage.setPromise(CACHE.CONFIG, data, new DateTime().nextDay());
        return data;
      })
      .catch(() => DEFAULT_CONFIG);
  });
};

export const requestRemoteTimeTable = (load = 1, throttle = false): Promise<RemoteTableInfo> => {
  console.log("GET TABLE FROM REMOTE");
  return HTTP.request<string>({
    load: load,
    throttle: throttle,
    url: SW_HOST + "xskb/xskb_list.do",
    data: {
      sfFD: 1,
      xnxq01id: App.data.curTerm,
    },
  }).then(res => {
    const table: RemoteTableInfo = [];
    try {
      const key = CACHE.PLUS_TABLE;
      const cache: TableCache = { data: table, term: App.data.curTerm };
      LocalStorage.setPromise(key, cache);
    } catch (error) {
      console.log("Request Table Error:", error);
      Toast.info("课表解析出错");
    }
    return table;
  });
};

export const requestTimeTable = (
  cache = true,
  load = 1,
  throttle = false
): Promise<RemoteTableInfo> => {
  const key = CACHE.PLUS_TABLE;
  if (!cache) return requestRemoteTimeTable(load, throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE");
      return data.data;
    } else {
      return requestRemoteTimeTable(load, throttle);
    }
  });
};
