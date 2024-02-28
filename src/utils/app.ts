import Taro from "@tarojs/taro";

import { Event, EVENT_ENUM } from "./event";
import { globalAppData } from "./global";
import { Loading } from "./loading";
import { Toast } from "./toast";

export const App = {
  data: globalAppData,
  init: () => {
    Loading.start({ load: 3, title: "加载中" });
    return Taro.login()
      .then(res => {
        /* 判断是否正常初始化 */

        /* resolve */
        return Promise.resolve();
      })
      .then(() => {
        Event.commit(EVENT_ENUM.ON_LOADED, null);
      })
      .catch((err: Error) => {
        console.log(err);
        Toast.modal(
          "警告",
          // @ts-expect-error errMsg
          "数据初始化失败，点击确定重新初始化数据 \r\n" + err.errMsg || err.message || ""
        ).then(() => {
          App.init();
        });
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
