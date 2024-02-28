import { View } from "@tarojs/components";
import type { FC } from "react";

import styles from "./index.module.scss";

export const Divider: FC<{
  margin?: number;
  style?: React.CSSProperties;
}> = props => {
  return (
    <View
      className={styles.divider}
      style={{ marginTop: props.margin, marginBottom: props.margin, ...props.style }}
    ></View>
  );
};
