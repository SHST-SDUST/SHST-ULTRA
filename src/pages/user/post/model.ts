import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type Announce = {
  announce: string;
};

export const requestForAnnounce = () => {
  return HTTP.request<{ info: Announce[] }>({
    load: 2,
    throttle: true,
    url: App.data.url + "/ext/announce",
  }).then(res => res.data.info.reverse());
};
