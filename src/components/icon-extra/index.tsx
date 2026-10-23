import { Text } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.module.scss";

/**
 * 扩展图标组件，使用 shst-icon-extra 字体
 * 与 Icon 组件分离，避免字体族冲突
 */
export const IconExtra: FC<{
  type: string;
  size?: number;
  className?: string;
  color?: string;
}> = props => {
  return (
    <Text
      className={cs("shst-icon-extra", `icon-${props.type}`, styles.icon, props.className)}
      style={{ fontSize: props.size, color: props.color }}
    ></Text>
  );
};
