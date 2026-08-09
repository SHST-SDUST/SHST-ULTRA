/* eslint-disable @typescript-eslint/no-unused-vars */
import { App } from "@/utils/app";
import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

import { htmlToClassroom } from "./parser";

export type ClassItem = {
  date: [boolean, boolean, boolean, boolean, boolean];
  room: string;
  type: string;
};
export type RemoteClassRoom = {
  info: ClassItem[] & {
    msg?: string;
  };
};

export const requestForClassRoom = (campus: string, date: string) => {
  return HTTP.request<string>({
    load: 0,
    method: "POST",
    throttle: true,
    url: SW_HOST + "kbxx/jsjy_query2",
    data: {
      xnxqh: App.data.curTerm,
      xqbh: campus,
      jxqbh: "",
      jxlbh: "",
      jslx: "",
      bjfh: "=",
      rnrs: "",
      yx: "",
      kbjcmsid: "16FD8C2BE55E15F9E0630100007FF6B5",
      selectZc: "",
      startdate: date,
      enddate: date,
      selectXq: "1,2,3,4,5,6,7",
      selectJc: "0102,0304,0506,0708,0910",
      syjs0601id: "",
      typewhere: "",
      jszq: "",
      qsxq: "1",
      jyms: "1",
    },
  }).then(res => {
    const data = htmlToClassroom(res.data, date);
    if (!data || "msg" in data) {
      Toast.info((data && data.msg) || "加载失败，请重试");
      return null;
    }
    const rooms = data;
    const exclude = [
      "实验室",
      "活动教室",
      "电教室",
      "乒乓球馆",
      "体育场",
      "计算机房",
      "专用教室",
      "物理实验室",
      "田径场",
      "足球场",
      "篮排馆",
      "网球场",
      "健身房",
      "制图室",
    ];
    return rooms.filter(item => exclude.indexOf(item.type) === -1);
  });
};
