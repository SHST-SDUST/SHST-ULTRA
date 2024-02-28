import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.module.scss";

export const Banner: FC<{
  title?: string;
  color?: string;
  className?: string;
  inheritColor?: boolean;
  captainHeight?: string | number;
}> = props => {
  return (
    <View className={cs(props.className, styles.container)}>
      {props.title && (
        <View
          className={styles.head}
          style={{
            height: props.captainHeight ? props.captainHeight + "px" : "auto",
          }}
        >
          <View className={styles.left}>
            <View
              className={styles.vertical}
              style={{ background: props.color || "#165DFF" }}
            ></View>
            <View className={styles.title}>{props.title}</View>
          </View>
          <View>{props.children}</View>
        </View>
      )}
    </View>
  );
};
