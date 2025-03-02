import { TSON } from "laser-utils";

import { CACHE, CONFIG_HOST } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { to } from "@/utils/native";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

export type SwiperItem = { img: string; url: string };

export type Config = {
  term: string;
  termStart: string;
  swiper: SwiperItem[];
  post: { title: string; link: string };
};

export const DEFAULT_CONFIG: Config = {
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
  term: "2024-2025-2",
  termStart: "2025-02-24",
};

export const requestGlobalConfig = async (): Promise<Config> => {
  const cache = await LocalStorage.getPromise<Config>(CACHE.CONFIG);
  if (cache) return cache;
  const [err, res] = await to(
    HTTP.request<{ readme: string }>({
      load: 0,
      // https://shst.touchczy.top/ultra/term
      // https://shst.touchczy.top/ultra/config
      url: CONFIG_HOST + "/shst-ultra?t=" + new Date().getTime(),
    })
  );
  if (err || !res.data || !res.data.readme) {
    if (process.env.NODE_ENV === "development") {
      Toast.info("请求远程配置信息失败，尝试使用兜底配置");
    }
    const persist = await LocalStorage.getPromise<Config>(CACHE.PERSIST_CONFIG);
    if (persist) return persist;
  }
  if (res && res.data && res.data.readme) {
    const str = res.data.readme;
    const startIndex = str.indexOf("<!--#");
    const endIndex = str.indexOf("#-->");
    if (startIndex === -1 || endIndex === -1) return DEFAULT_CONFIG;
    const json = str.slice(startIndex + 5, endIndex);
    const data = TSON.parse<Config>(json);
    if (!data || !data.term || !data.termStart) return DEFAULT_CONFIG;
    LocalStorage.setPromise(CACHE.CONFIG, data, new DateTime().deferHour(2));
    LocalStorage.setPromise(CACHE.PERSIST_CONFIG, data);
    return data;
  }
  if (process.env.NODE_ENV === "development") {
    Toast.info("获取配置信息失败，使用默认配置");
  }
  return DEFAULT_CONFIG;
};
