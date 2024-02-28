import Taro from "@tarojs/taro";

import { Cookie } from "./cookie";
import { Limit } from "./limit";
import { Loading } from "./loading";
import { Toast } from "./toast";

const throttle = Limit.throttleGlobalFactory();
const debounce = Limit.debounceGlobalFactory();

const headers = {
  "cookie": "",
  "content-type": "application/x-www-form-urlencoded",
};

type RequestOptions = Parameters<typeof Taro.request>[0];
type NoUndefinedField<T> = { [P in keyof T]-?: NonNullable<T[P]> };
type SuccessCallbackOptions = Parameters<Required<RequestOptions>["success"]>["0"];

export type RequestOptionsAllNeeded = NoUndefinedField<RequestInfo>;
export interface RequestInfo {
  title?: string;
  load?: number;
  url: string;
  method?: Parameters<typeof Taro.request>[0]["method"];
  data?: Record<string, unknown>;
  cookie?: boolean;
  debounce?: boolean;
  throttle?: boolean;
  headers?: typeof headers;
  success?: RequestOptions["success"];
  fail?: RequestOptions["fail"];
  complete?: RequestOptions["complete"];
  completeLoad?: RequestOptions["complete"];
  [key: string]: unknown;
}

export const xhr = (requestInfo: RequestInfo): void => {
  const options: RequestOptionsAllNeeded = {
    title: "",
    load: 1,
    url: "",
    method: "GET",
    data: {},
    cookie: true,
    debounce: false,
    throttle: false,
    headers: headers,
    success: () => void 0,
    fail: function () {
      this.completeLoad = () => Toast.info("外部数据错误");
    },
    complete: () => void 0,
    completeLoad: () => void 0,
  };
  Object.assign(options, requestInfo);
  const run = () => {
    Loading.start(options);
    console.log("Request for", options.url);
    Taro.request({
      url: options.url,
      data: options.data,
      method: options.method,
      header: headers,
      success: function (res) {
        if (options.cookie && !headers.cookie) {
          const cookie = Cookie.get(res);
          headers.cookie = cookie;
          !cookie && options.fail({ ...res, errMsg: "No Cookies" });
        }
        if (res.statusCode === 200) {
          if (
            typeof res.data === "object" &&
            !(res.data instanceof ArrayBuffer) &&
            res.data.status
          ) {
            if (res.data.status === -1 && res.data.msg) {
              const popupMsg = res.data.msg;
              options.completeLoad = () => Toast.info(popupMsg);
              return void 0;
            }
          }
          try {
            options.success(res);
          } catch (e) {
            const ERROR_MSG = "Execute Fail";
            options.fail({ ...res, errMsg: ERROR_MSG });
            options.completeLoad = () => Toast.info(ERROR_MSG);
            console.log(e);
          }
        } else {
          options.fail({ ...res, errMsg: "Response No Status" });
        }
      },
      fail: function (res) {
        options.fail(res);
      },
      complete: function (res) {
        Loading.end(options);
        try {
          options.complete(res);
        } catch (e) {
          console.log(e);
        }
        options.completeLoad(res);
      },
    });
  };
  if (options.debounce) {
    debounce(500, () => run());
  } else if (options.throttle) {
    throttle(500, () => run());
  } else {
    run();
  }
};

type ResponseDataType = SuccessCallbackOptions["data"];
export type PromiseFulfilled<T> = Omit<SuccessCallbackOptions, "data"> & {
  data: T;
};

export const request = <T extends ResponseDataType>(
  requestInfo: RequestInfo
): Promise<PromiseFulfilled<T>> => {
  return new Promise((resolve, reject) => {
    requestInfo.success = res => resolve(res as PromiseFulfilled<T>);
    requestInfo.fail = res => reject(res);
    xhr(requestInfo);
  });
};

xhr.headers = headers;
request.headers = headers;

export const HTTP = { xhr, request };
