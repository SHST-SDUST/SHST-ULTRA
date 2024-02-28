import Taro from "@tarojs/taro";

import { PATH } from "./constant";

const fail = (e: TaroGeneral.CallbackResult) => console.log(e);

export const Nav = {
  to: (url: string) => Taro.navigateTo({ url, fail }),
  tab: (url: string) => Taro.switchTab({ url, fail }),
  launch: (url: string) => Taro.reLaunch({ url, fail }),
  back: (delta = 1) => Taro.navigateBack({ delta, fail }),
  redirect: (url: string) => Taro.redirectTo({ url, fail }),
  webview: (url: string) =>
    Taro.navigateTo({
      url: PATH.WEBVIEW + "?url=" + encodeURIComponent(url),
      fail,
    }),
};
