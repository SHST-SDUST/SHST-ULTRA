import "./styles/global.scss";

import { useError, useLaunch, usePageNotFound } from "@tarojs/taro";
import type { FC } from "react";

import { ErrorBoundary } from "./components/error";
import { App as AppAPI } from "./utils/app";
import { PATH } from "./utils/constant";
import { Nav } from "./utils/nav";
import { Report } from "./utils/report";
import { Toast } from "./utils/toast";

const AppLauncher: FC = ({ children }) => {
  useLaunch(() => {
    AppAPI.update();
    AppAPI.init();
  });

  usePageNotFound(() => {
    Nav.launch(PATH.NOT_FOUNT);
  });

  useError(err => {
    // 避免无限递归调用
    try {
      Report.error(err);
      console.log(err);
      Toast.info("发生内部错误: \r\n" + String(err).slice(0, 100));
    } catch (e) {
      console.log(e);
    }
  });

  // `children`是将要会渲染的页面
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default AppLauncher;
