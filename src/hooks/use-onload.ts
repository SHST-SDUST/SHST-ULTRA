import { useLoad } from "@tarojs/taro";

import { App } from "@/utils/app";

export const useOnLoad = (fn: (options: Record<string, string>) => void) => {
  useLoad(e => {
    App.onload(() => fn(e));
  });
};
