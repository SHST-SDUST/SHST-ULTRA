import Taro from "@tarojs/taro";

export const Preview = {
  image: (url: string, list?: string[]) => {
    Taro.previewImage({ current: url, urls: list ? list : [url] });
  },
};
