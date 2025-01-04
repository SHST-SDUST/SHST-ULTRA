import { CACHE, PROD_HOST, REMOTE_STATIC } from "@/utils/constant";
import { DateTime } from "@/utils/datetime";
import { to } from "@/utils/native";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

type WeatherType = {
  sky: string;
  min: number;
  max: number;
  desc: string;
  future: string[];
};

export const STATIC_PATH = REMOTE_STATIC + "weather/";
export const CLEAR = STATIC_PATH + `CLEAR_DAY.png`;
const CLEAR_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAMAAABggeDtAAAAh1BMVEUAAAD/0RL/0RH/0xb/2RP/0hH/0hH//1z/1Rr/0hL/0xH/0RL/0xP/2Bb/0RL/0hH/0hH/0hL/0xP/0xL/1BL/1xT/1xj/0hL/0hH/0hL/0hL/0hH/0hL/0hL/0xL/0hL/1BP/1hv/2BP/0RH/0RL/0hL/0RL/0hP/0RP/0RL/0RH/0hP/0RE3gW08AAAALHRSTlMA2bMuGmbiAhCJhG8oFvXBr5d5YUclH+jS98ymnlU9OTQSDO/JupF8enBZT+e8vwcAAAGxSURBVEjH3dfJlpswEIXhK1tMNsZ2G8+zu5Oe7vs/XwR0mjgqRG2ycL79X0I6HI5A0IDOEAH/d3+InRyPYWKhNBTzjVEOeGIk5aQ3ILGXPPVzMpLyuwHJOdutWSnMbHG9y4UB1tCJV2gs53Xbmi4SNEasjOENaPPJnD7z2Q6oc2/A7/ytoGiafw2oc49t8tuMXZ5L1M7ottow4B09VmsGjRB027DHB0Jm7LO9BPI39otTdJkUVMjQZU6NwkK2pM5Bv7xsAkmyplIEyZlaA0gyam1vEOyoVkKwptqirQbOoT4+6r3CKasUdGI4lnpzOBGdtr9Qbyb0OfX2Qp9SL2v7oZOjUlBtDOdapWgZqh3lb49aDsGCWgaSK7UyiKZUOkGg34BJIEqM+vRln9R4Qaepevey/Jm9fiKgZJ8fCULeGWZShI3C+RJ9PraBhw+t/jRC7RJ3Hl2z9+XUSvn35SLNCgpeTmjymMZKeXs7sQd/50d85/QHDFk748skGmz/iLNTcv+O7fGXyLtV3srF63y2z8bH3Lup7vyDjOpcwZo690R1rmD3KR5DGTnXx/1//Pf9L/Y8HGsaFvVaAAAAAElFTkSuQmCC";
const FALLBACK: WeatherType = {
  sky: CLEAR_PNG,
  min: 0,
  max: 0,
  desc: "未来两小时无降水",
  future: Array(5).fill(CLEAR_PNG),
};

export const requestWeatherData = async (): Promise<WeatherType> => {
  const cache = await LocalStorage.getPromise<WeatherType>(CACHE.WEATHER);
  if (cache) return cache;
  const [err, res] = await to(
    HTTP.request<{ data: WeatherType }>({
      url: PROD_HOST + "/ultra/weather",
      cookie: false,
    })
  );
  if (!err && res.statusCode === 200 && res.data && res.data.data.sky) {
    const data = res.data.data;
    const payload = {
      sky: CLEAR,
      min: data.min || 0,
      max: data.max || 0,
      desc: data.desc || "loading...",
      future: data.future ? data.future.map(it => `${STATIC_PATH + it}.png`) : Array(5).fill(CLEAR),
    };
    LocalStorage.setPromise(CACHE.WEATHER, payload, new DateTime().deferMinute(30));
    return payload;
  }
  LocalStorage.setPromise(CACHE.WEATHER, FALLBACK, new DateTime().nextDay());
  return FALLBACK;
};
