import Taro from "@tarojs/taro";

import { SW_HOST } from "./constant";
import { Event, EVENT_ENUM } from "./event";
import { globalAppData } from "./global";
import { Loading } from "./loading";
import { RegExec } from "./regex";
import { HTTP } from "./request";
import { Toast } from "./toast";

export const App = {
  data: globalAppData,
  init: () => {
    Loading.start({ load: 3, title: "加载中" });
    return HTTP.request<string>({
      url: SW_HOST + "jxzl/jxzl_query",
    })
      .then(res => {
        const html = res.data;
        const termExp = RegExec.exec(/<option [\s\S]*? selected="selected">(.*?)<\/option>/, html);
        const term = RegExec.get(termExp, 1);
        const termStartExp = RegExec.exec(/<td title=['"](.*?)['"]>/, html);
        const termStart = RegExec.get(termStartExp, 1)
          .replace("年", "-")
          .replace("月", "-")
          .replace("日", "");
        console.log("初始化数据 :>> ", term, termStart);
        if (!/\d{4}-\d{4}-\d{1}/.test(term) || !/\d{4}-\d{2}-\d{2}/.test(termStart)) {
          throw new Error("日期格式解析错误");
        }
        App.data.curTerm = term;
        App.data.curTermStart = termStart;
        return Promise.resolve();
      })
      .then(() => {
        Event.commit(EVENT_ENUM.ON_LOADED, null);
      })
      .catch((err: Error) => {
        Toast.modal("警告", "数据初始化失败，点击确定重新初始化数据 \r\n" + String(err)).then(
          () => {
            App.init();
          }
        );
      })
      .finally(() => {
        Loading.end({ load: 3 });
      });
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
          // `ApplyUpdate`应用新版本并重启
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
