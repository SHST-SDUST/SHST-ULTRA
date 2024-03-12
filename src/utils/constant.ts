import { DateTime } from "./datetime";

export { PATH } from "../config/page";

export const SW_HOST = "https://jwgl.sdust.edu.cn/jsxsd/";
export const CONFIG_URL = "https://registry.npmmirror.com/shst-ultra/latest/files/config.json";

export const CACHE = {
  CONFIG: "CONFIG",
  WEATHER: "WEATHER",
  SENTENCE: "SENTENCE",
  SENTENCE_LONG: "SENTENCE_LONG",
  USER: "USER",
  ANNOUNCE_INDEX: "ANNOUNCE_INDEX",
  USER_INFO: "USER_INFO",
  PLUS_TABLE: "PLUS_TABLE",
};

export const DEV_HOST = "http://dev.shst.touchczy.top";
export const REMOTE_STATIC = DEV_HOST + "/public/static/";

export const NOW = new DateTime();
export const TODAY = NOW.format();
export const EXPLORATION = "2024-03-14";
