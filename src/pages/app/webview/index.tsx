import { WebView as AppWebView } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { type FC, useState } from "react";

const WebView: FC = () => {
  const [src, setSrc] = useState("");

  useLoad(options => {
    options.url && setSrc(decodeURIComponent(options.url));
  });

  return src ? <AppWebView src={src} /> : null;
};

export default WebView;
