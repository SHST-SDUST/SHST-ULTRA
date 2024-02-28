import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import { stopBubble } from "@/utils/stop";

import { Icon } from "../icon";
import styles from "./index.module.scss";

export const Dialog: FC<{
  className?: string;
  visible: boolean;
  onClose: (visible: boolean) => void;
}> = props => {
  const onClose = () => {
    props.onClose(false);
  };

  if (!props.visible) {
    return null;
  }
  return (
    <View className={styles.container} onClick={onClose} catchMove>
      <View className={cs(styles.member, props.className)} onClick={stopBubble}>
        {props.children}
        <View onClick={onClose} className={cs(styles.close, "x-center y-center")}>
          <Icon type="x" className={styles.iconX}></Icon>
        </View>
      </View>
    </View>
  );
};
