import { CACHE } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

type WeatherType = {
  sky: string;
  min: number;
  max: number;
  desc: string;
  future: string[];
};

export const requestWeatherData = (): Promise<WeatherType | null> => {
  const id = (Math.random() * 100000000000) >> 0;
  return LocalStorage.getPromise<WeatherType>(CACHE.WEATHER)
    .then(res => {
      if (res) return res;
      return null;
    })
    .then(cache => {
      if (cache) return Promise.resolve(cache);
      return HTTP.request<unknown>({
        url:
          "https://api.caiyunapp.com/v2/Y2FpeXVuIGFuZHJpb2QgYXBp/" +
          "120.127164,36.000129/weather?lang=zh_CN&device_id=" +
          id,
        cookie: false,
      }).then(res => {
        if (res.statusCode === 200) {
          // @ts-expect-error TODO: 标注类型
          const weather = res.data.result.daily;
          const sky = weather.skycon[0].value;
          const min = weather.temperature[0].min;
          const max = weather.temperature[0].max;
          // @ts-expect-error TODO: 标注类型
          const desc = res.data.result.hourly.description;
          const future = weather.skycon.map(item => item.value);
          return { sky, min, max, desc, future };
        }
        return null;
      });
    })
    .then(res => {
      if (res) {
        LocalStorage.setPromise(CACHE.WEATHER, res, new DateTime().nextHour());
      }
      return res;
    });
};
