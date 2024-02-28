import { Navigator, View } from "@tarojs/components";
import type { FC } from "react";

import { PATH } from "@/config/page";

import styles from "./index.module.scss";

const NotFound: FC = () => {
  return (
    <View>
      <View className={styles.status}>404</View>
      <View className={styles.status}>NOT</View>
      <View className={styles.status}>FOUND</View>
      <Navigator url={PATH.HOME} open-type="reLaunch" className={styles.back} hover-class="none">
        返回首页
      </Navigator>
    </View>
  );
};

export default NotFound;
