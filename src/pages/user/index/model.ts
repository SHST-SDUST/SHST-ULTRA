import { App } from "@/utils/app";
import { CACHE } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";
import { Toast } from "@/utils/toast";

export type UserInfo = {
  name: string;
  account: string;
  academy: string;
};

export const requestForUserInfo = (): Promise<UserInfo | null> => {
  return LocalStorage.getPromise<UserInfo>(CACHE.USER_INFO).then(res => {
    if (res && res.account) return res;
    return HTTP.request<{ info: UserInfo }>({
      load: 1,
      throttle: true,
      url: App.data.url + "/sw/userInfo",
    }).then(data => {
      if (!data || !data.data) {
        Toast.info("服务器错误");
        return null;
      }
      LocalStorage.setPromise(CACHE.USER_INFO, data.data.info);
      return data.data.info;
    });
  });
};
