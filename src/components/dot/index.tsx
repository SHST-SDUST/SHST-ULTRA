import { View } from "@tarojs/components";
import { isArray } from "laser-utils";
import { type FC, useMemo } from "react";

import { App } from "@/utils/app";

import styles from "./index.module.scss";

export const parseBackground = (name: string | string[]) => {
  const str = isArray(name) ? name.join("") : name;
  const colorList = App.data.colorList;
  const uniqueNum = str.split("").reduce((pre, cur) => pre + cur.charCodeAt(0), 0);
  const background = colorList[uniqueNum % colorList.length];
  return background;
};

export const Dot: FC<{ type?: string; background?: string; name?: string | string[] }> = props => {
  const background = useMemo(() => {
    if (!props.background && !props.type && props.name) {
      return parseBackground(props.name);
    }
    return "";
  }, [props.name, props.background, props.type]);

  return (
    <View
      className={styles.dot}
      style={{
        background: props.background
          ? props.background
          : background || `var(--color-${props.type || "fill-3"})`,
      }}
    ></View>
  );
};
