import { CACHE, CONFIG_URL } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
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
