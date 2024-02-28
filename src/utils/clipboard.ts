import Taro from "@tarojs/taro";

export const Clipboard = {
  copy: (str: string) => Taro.setClipboardData({ data: str }),
};
