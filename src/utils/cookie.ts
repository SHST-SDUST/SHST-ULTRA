import { LocalStorage } from "./storage";

export const Cookie = {
  get: (res: { header: { [key: string]: string } }): string => {
    let cookies = "";
    if (res && res.header) {
      for (const item in res.header) {
        if (item.toLowerCase() === "set-cookie") {
          const cookie = res.header[item].match(/.*?=.*?;/);
          cookies += cookie; // [] + "" = ""
        }
      }
      console.log("SetCookie:", cookies);
      LocalStorage.setPromise("cookies", cookies);
    } else {
      console.log("Get Cookie From Cache");
      cookies = LocalStorage.get("cookies") || "";
    }
    return cookies;
  },
};
