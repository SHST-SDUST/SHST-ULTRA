import { LocalStorage } from "./storage";

export const Cookie = {
  get: (res: { header: { [key: string]: string } }): string => {
    let cookies = "";
    if (res && res.header) {
      for (const item in res.header) {
        if (item.toLowerCase() !== "set-cookie") continue;
        const v = res.header[item];
        const cookieMatch = v.match(/[A-Za-z0-9_]*?=.*?;/g) || [];
        for (const cookieItem of cookieMatch) {
          const c = cookieItem.toLowerCase();
          if (c.match(/path=\//i)) continue;
          cookies = cookies + cookieItem;
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
