import Taro from "@tarojs/taro";

import { requestGlobalConfig } from "@/pages/index/index/model";

import { DateTime } from "./datetime";
import { Event, EVENT_ENUM } from "./event";
import { globalAppData } from "./global";
import { Loading } from "./loading";
import { Toast } from "./toast";

export const App = {
  data: globalAppData,
  init: async () => {
    Loading.start({ load: 3, title: "加载中" });
    try {
      const config = await requestGlobalConfig();
      // 解析 学期/开学 数据
      const term = config.term;
      const termStart = config.termStart;
      console.log("初始化配置数据:", config);
      if (!/\d{4}-\d{4}-\d{1}/.test(term) || !/\d{4}-\d{2}-\d{2}/.test(termStart)) {
        throw new Error("日期格式解析错误");
      }
      // 开始处理周次
      const now = new DateTime();
      if (now.format() < termStart) {
        App.data.curWeek = 1;
      } else {
        const week = now.diff(new DateTime(termStart)).days / 7 + 1;
        App.data.curWeek = Math.floor(week);
      }
      // 初始化定义数据
      App.data.curTerm = term;
      App.data.curTermStart = termStart;
      App.data.swiper = config.swiper;
      App.data.post = config.post;
      App.data.isInitialized = true;
      await Promise.resolve();
      Event.commit(EVENT_ENUM.ON_LOADED, null);
    } catch (err) {
      App.data.isInitialized = false;
      Toast.modal("警告", "数据初始化失败，点击确定重新初始化数据 \r\n" + String(err)).then(() => {
        App.init();
      });
    } finally {
      Loading.end({ load: 3 });
    }
  },
  onload: (func: () => void) => {
    return new Promise<void>(resolve => {
      if (App.data.isInitialized) {
        func();
        resolve();
      } else {
        const delay = () => {
          func();
          resolve();
        };
        Event.once(EVENT_ENUM.ON_LOADED, delay);
      }
    });
  },
  update: () => {
    if (!Taro.getUpdateManager) return;
    Taro.getUpdateManager().onCheckForUpdate(res => {
      console.log("Update:", res.hasUpdate);
      // 如果有新版本
      if (!res.hasUpdate) return void 0;
      // 新版本下载完成
      Taro.getUpdateManager().onUpdateReady(() => {
        Toast.confirm("更新提示", "新版本已经准备好，单击确定重启应用").then(result => {
          // ApplyUpdate 应用新版本并重启
          if (result) Taro.getUpdateManager().applyUpdate();
        });
      });
      // 当新版本下载失败
      Taro.getUpdateManager().onUpdateFailed(() => {
        Toast.modal("提示", "检查到有新版本，但下载失败，请检查网络设置");
      });
    });
  },
};
