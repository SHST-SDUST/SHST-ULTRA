import { CACHE, PROD_HOST, REMOTE_STATIC } from "@/utils/constant";
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

export const CLEAR = "CLEAR_DAY";
export const STATIC_PATH = REMOTE_STATIC + "weather/";

export const requestWeatherData = (): Promise<WeatherType | null> => {
  return LocalStorage.getPromise<WeatherType>(CACHE.WEATHER)
    .then(res => {
      if (res) return res;
      return null;
    })
    .then(cache => {
      if (cache) return Promise.resolve(cache);
      return HTTP.request<{ data: WeatherType }>({
        url: PROD_HOST + "/ext/weather",
        cookie: false,
      }).then(res => {
        if (res.statusCode === 200 && res.data && res.data.data.sky) {
          const data = res.data.data;
          return {
            sky: data.sky || CLEAR,
            min: data.min || 0,
            max: data.max || 0,
            desc: data.desc || "loading...",
            future: data.future || Array(5).fill(CLEAR),
          };
        }
        return null;
      });
    })
    .then(res => {
      if (res) {
        LocalStorage.setPromise(CACHE.WEATHER, res, new DateTime().deferMinute(30));
      }
      return res;
    });
};
