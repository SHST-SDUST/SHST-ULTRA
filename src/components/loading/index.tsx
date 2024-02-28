import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";
import React, { useMemo } from "react";

import { LOADING_STATE } from "./constant";
import styles from "./index.module.scss";

export const Loading: FC<{
  state: string;
  onNext: () => void;
  className?: string;
  block?: boolean;
}> = props => {
  const status = useMemo(() => {
    switch (props.state) {
      case LOADING_STATE.LOADING:
        return "加载中";
      case LOADING_STATE.LOADING_MORE:
        return "点击加载更多";
      case LOADING_STATE.NO_MORE:
        return "我也是有底线的";
      default:
        return "我也是有底线的";
    }
  }, [props.state]);

  return (
    <React.Fragment>
      <View
        className={cs(styles.loadContainer, props.block && styles.block, props.className)}
        onClick={() => props.state === LOADING_STATE.LOADING_MORE && props.onNext()}
      >
        {props.state !== LOADING_STATE.LOADING && <View className={styles.line}></View>}
        {props.state === LOADING_STATE.LOADING && (
          <View>
            <View className={styles.loader}></View>
          </View>
        )}
        <View className={styles.status}>{status}</View>
        {props.state !== LOADING_STATE.LOADING && <View className={styles.line}></View>}
      </View>
    </React.Fragment>
  );
};
