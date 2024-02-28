import { DEV_HOST, PROD_HOST } from "./constant";

export interface Data {
  // 基本配置
  url: string;
  openid: string;
  // `DOT`标识
  point: string;
  // 登录状态
  isInitialized: boolean;
  isSHSTLogin: boolean;
  isPLUSLogin: boolean;
  // 系统信息
  project: string;
  version: string;
  // 学期与周数
  curWeek: number;
  curTerm: string;
  curTermStart: string;
  // 系统颜色列表
  colorList: Array<string>;
  // 暂存与远程数据
  tmp: { [key: string]: unknown };
  initData: InitDataType | Record<string, never>;
}

export type InitDataType = {
  tips: string;
  curTerm: string;
  termStart: string;
  curWeek: number;
  popup: { popup: string; serial: number; path: string };
  ads: Array<{ img: string; url: string }>;
  articalName: string;
  articleUrl: string;
  custom: { color_list: string };
};

export const globalAppData: Data = {
  url: "",
  tmp: {},
  openid: "",
  point: "",
  curWeek: 1,
  isInitialized: false,
  isSHSTLogin: false,
  isPLUSLogin: false,
  initData: {},
  version: "3.6.0",
  project: "山科小站",
  curTerm: "2019-2020-1",
  curTermStart: "2019-08-26",
  colorList: ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFCA62", "#FFA477"],
};

console.log("Version:", globalAppData.version);

if (process.env.NODE_ENV === "development") {
  console.log("Environment:", "development");
  globalAppData.url = DEV_HOST;
} else {
  console.log("Environment:", "production");
  globalAppData.url = PROD_HOST;
}
