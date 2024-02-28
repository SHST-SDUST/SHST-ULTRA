import type { ITouchEvent } from "@tarojs/components";
import { Text } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";

import styles from "./index.modules.scss";

export const Icon: FC<{
  type: string;
  size?: number;
  className?: string;
  space?: boolean;
  dilute?: boolean;
  color?: string;
  onClick?: (event: ITouchEvent) => void;
}> = props => {
  return (
    <Text
      className={cs(
        "shst-icon",
        `icon-${props.type}`,
        props.space && styles.space,
        props.dilute && styles.dilute,
        props.className
      )}
      onClick={props.onClick}
      style={{ fontSize: props.size, color: props.color }}
    ></Text>
  );
};
