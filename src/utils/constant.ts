import { DateTime } from "./datetime";

export { PATH } from "../config/page";

export const CACHE = {
  CONFIG: "CONFIG2",
  PERSIST_CONFIG: "PERSIST_CONFIG",
  WEATHER: "WEATHER2",
  SENTENCE: "SENTENCE2",
  SENTENCE_LONG: "SENTENCE_LONG2",
  USER: "USER",
  ANNOUNCE_INDEX: "ANNOUNCE_INDEX",
  USER_INFO: "USER_INFO",
  PLUS_TABLE: "PLUS_TABLE",
};

export const PROD_HOST = "https://shst.touchczy.top";
export const DEV_HOST = "http://dev.shst.touchczy.top";
export const SW_HOST = "https://jwgl.sdust.edu.cn/jsxsd/";
export const REMOTE_STATIC = DEV_HOST + "/public/static/";
export const CONFIG_HOST = "https://registry.npmmirror.com";

export const NOW = new DateTime();
export const TODAY = NOW.format();
export const BUILD_TIME = new DateTime(process.env.NOW);
export const EXPLORATION = BUILD_TIME.nextDay(3).format("yyyy-MM-dd");
