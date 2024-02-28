import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type LoginResponse = {
  status: number;
  msg: string;
};

export const loginApp = (account: string, password: string, code: string) => {
  return HTTP.request<LoginResponse>({
    url: App.data.url + "/plus/login/1",
    method: "POST",
    throttle: true,
    data: {
      account: account,
      password: encodeURIComponent(password),
      code: code,
      openid: App.data.openid,
    },
  }).then(res => res.data);
};

export const requestForVerifyCode = () => {
  return HTTP.request<{ img: string; code: string }>({
    url: App.data.url + "/plus/getVerifyCode",
  });
};
