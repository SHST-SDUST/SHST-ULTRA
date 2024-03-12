export interface Data {
  // 基本配置
  url: string;
  // 登录状态
  isInitialized: boolean;
  isULTRALogin: boolean;
  // 系统信息
  project: string;
  version: string;
  // 学期与周数
  curWeek: number;
  curTerm: string;
  curTermStart: string;
  // 系统颜色列表
  colorList: Array<string>;
  // 暂存数据
  tmp: { [key: string]: unknown };
}

export const globalAppData: Data = {
  url: "",
  tmp: {},
  curWeek: 1,
  isInitialized: false,
  isULTRALogin: false,
  version: "3.6.1",
  project: "山科小站",
  curTerm: "2019-2020-1",
  curTermStart: "2019-08-26",
  colorList: ["#FE9E9F", "#93BAFF", "#D999F9", "#81C784", "#FFCA62", "#FFA477"],
};

console.log("Version:", globalAppData.version);

if (process.env.NODE_ENV === "development") {
  console.log("Environment:", "development");
} else {
  console.log("Environment:", "production");
}
