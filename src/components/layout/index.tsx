import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.module.scss";

export const Layout: FC<{
  title?: string;
  color?: string;
  topSpace?: boolean;
  className?: string;
  cardClassName?: string;
  inheritColor?: boolean;
  captainSlot?: React.ReactNode;
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
          <View>{props.captainSlot}</View>
        </View>
      )}
      <View
        className={cs(styles.card, props.cardClassName)}
        style={{
          color: props.inheritColor ? props.color : void 0,
          paddingTop: !props.topSpace && props.title ? 3 : void 0,
        }}
      >
        {props.children}
      </View>
    </View>
  );
};
