import { View } from "@tarojs/components";
import type { FC } from "react";

export const Gap: FC<{
  size: number;
  className?: string;
}> = props => {
  return (
    <View
      className={props.className}
      style={{ borderTop: `${props.size}px solid transparent` }}
    ></View>
  );
};
