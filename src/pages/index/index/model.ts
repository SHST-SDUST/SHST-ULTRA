import type { TableCache, TableData } from "@/pages/plus/study/timetable/model";
import { App } from "@/utils/app";
import { CACHE, CONFIG_URL, SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

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
  return HTTP.request<Config>({
    load: 0,
    url: CONFIG_URL,
  })
    .then(res => res.data)
    .catch(() => DEFAULT_CONFIG);
};

export const requestRemoteTimeTable = (load = 1, throttle = false): Promise<TableData | null> => {
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
    return null;
  });
};

export const requestTimeTable = (
  cache = true,
  load = 1,
  throttle = false
): Promise<TableData | null> => {
  const week = App.data.curWeek;
  const key = CACHE.PLUS_TABLE;
  if (!cache) return requestRemoteTimeTable(load, throttle);
  return LocalStorage.getPromise<TableCache>(key).then(data => {
    if (data && data.term === App.data.curTerm) {
      console.log("GET TABLE FROM CACHE");
      return { info: data.data, week: week };
    } else {
      return requestRemoteTimeTable(load, throttle);
    }
  });
};
