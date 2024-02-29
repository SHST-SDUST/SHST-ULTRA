import { SW_HOST } from "@/utils/constant";
import { RegExec } from "@/utils/regex";
import { HTTP } from "@/utils/request";

export const CANVAS_ID = "canvas";
export const CAPTCHA_HEIGHT = 22;
export const CAPTCHA_WIDTH = 62;
export const BASE64_PREFIX = "data:image/jpg;base64,";

const base64Encode = str => {
  let output = "";
  let chr1: number,
    chr2: number,
    chr3: number,
    enc1: number,
    enc2: number,
    enc3: number,
    enc4: number;
  let i = 0;
  const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  while (i < str.length) {
    chr1 = str.charCodeAt(i++);
    chr2 = str.charCodeAt(i++);
    chr3 = str.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (Number.isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (Number.isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
  }
  return output;
};

export const loginApp = (account: string, password: string, code: string) => {
  return HTTP.request<string>({
    url: SW_HOST + "xk/LoginToXk",
    method: "POST",
    throttle: true,
    data: {
      encoded: base64Encode(account) + "%%%" + base64Encode(password),
      RANDOMCODE: code,
    },
  })
    .then(res => {
      if (res.statusCode === 302 || res.data.indexOf("calender_user_schedule") > -1) {
        return { status: 1, msg: "" };
      } else {
        const err = RegExec.exec(/<font[\s\S]*?>(.*?)<\/font>/, res.data);
        const msg = RegExec.get(err, 1).indexOf("!!") > -1 ? "验证码错误" : "账号或密码错误";
        return { status: 2, msg };
      }
    })
    .catch(error => {
      if (error && /url not in domain list/.test(error.errMsg)) {
        return { status: 1, msg: "" };
      }
      return { status: 2, msg: "未知错误" };
    });
};

export const requestForVerifyCode = () => {
  return HTTP.request<ArrayBuffer>({
    url: SW_HOST + "verifycode.servlet",
    responseType: "arraybuffer",
  }).then(res => res.data);
};
