import { SW_HOST } from "@/utils/constant";
import { RegExec } from "@/utils/regex";
import { HTTP } from "@/utils/request";

export const CANVAS_ID = "canvas";
export const CAPTCHA_HEIGHT = 22;
export const CAPTCHA_WIDTH = 62;
export const BASE64_PREFIX = "data:image/jpg;base64,";

export const loginApp = async (account: string, password: string, _code: string) => {
  const preFetch = await HTTP.request({ url: SW_HOST, method: "GET" });
  const text = preFetch.data as string;
  const code1 = RegExec.exec(/var scode = "(.*?)";/, text);
  const code2 = RegExec.exec(/var sxh = "(.*?)";/, text);
  const accountCode = encode(account);
  const passwordCode = encode(password);
  const code = accountCode + "%%%" + passwordCode + "%%%" + encode(" ");
  return HTTP.request<string>({
    url: SW_HOST + "xk/LoginToXk",
    method: "POST",
    throttle: true,
    data: {
      loginMethod: "LoginToXk",
      userlanguage: 0,
      userAccount: account,
      userPassword: "",
      encoded: encodeData(code, code1, code2),
    },
  })
    .then(res => {
      if (res.statusCode === 302 || res.data.indexOf("个人中心") > -1) {
        return { status: 1, msg: "" };
      } else {
        const err = RegExec.exec(/<font[\s\S]*?>(.*?)<\/font>/, res.data);
        const msg = err || "账号或密码错误";
        return { status: 2, msg };
      }
    })
    .catch(error => {
      if (error && /domain list/.test(error.errMsg)) {
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

const encode = (input: string): string => {
  const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let output = "";
  let chr1: number;
  let chr2: number;
  let chr3: number;
  let enc1: number;
  let enc2: number;
  let enc3: number;
  let enc4: number;
  let i = 0;
  const len = input.length;

  do {
    chr1 = i < len ? input.charCodeAt(i++) : 0;
    chr2 = i < len ? input.charCodeAt(i++) : 0;
    chr3 = i < len ? input.charCodeAt(i++) : 0;

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (chr2 === 0) {
      enc3 = enc4 = 64;
    } else if (chr3 === 0) {
      enc4 = 64;
    }

    output = output + keyStr[enc1] + keyStr[enc2] + keyStr[enc3] + keyStr[enc4];
  } while (i < len);

  return output;
};

const encodeData = (code: string, code1: string, code2: string): string => {
  let scode = code1;
  const sxh = code2;
  let encoded = "";

  const codeLength = code.length;

  for (let i = 0; i < codeLength; i++) {
    if (i < 55) {
      const step = parseInt(sxh.substring(i, i + 1), 10);
      encoded += code.substring(i, i + 1) + scode.substring(0, step);
      scode = scode.substring(step);
    } else {
      encoded += code.substring(i);
      break;
    }
  }
  return encoded;
};
