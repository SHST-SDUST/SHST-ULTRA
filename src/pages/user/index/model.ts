import { CACHE, SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";
import { LocalStorage } from "@/utils/storage";

import { htmlToUser } from "./parser";

export type UserInfo = {
  name: string;
  account: string;
  academy: string;
};

export const requestForUserInfo = (): Promise<UserInfo | null> => {
  return LocalStorage.getPromise<UserInfo>(CACHE.USER_INFO).then(cache => {
    if (cache && cache.account) return cache;
    return HTTP.request<string>({
      load: 1,
      throttle: true,
      url: SW_HOST + "grxx/xsxx",
    }).then(res => {
      const user = htmlToUser(res.data);
      LocalStorage.setPromise(CACHE.USER_INFO, user);
      return user;
    });
  });
};
