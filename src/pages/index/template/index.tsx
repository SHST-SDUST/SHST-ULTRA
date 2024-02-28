import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import React from "react";

import styles from "./index.module.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <React.Fragment>
      <View className={styles.index}>Hello world!</View>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
