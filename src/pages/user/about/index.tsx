import { Button, Image, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React from "react";

import { Icon } from "@/components/icon";
import { PATH } from "@/config/page";
import { App } from "@/utils/app";
import { Clipboard } from "@/utils/clipboard";

import { LOGO } from "./constant";
import styles from "./index.module.scss";

export default function Index() {
  return (
    <React.Fragment>
      <View className="x-center">
        <Image className={styles.img} src={LOGO}></Image>
      </View>

      <View className={styles.userInfoContainer}>
        <View className={cs(styles.line, styles.top)}>
          <View className="a-flex">
            <View>版本号</View>
          </View>
          <View>{App.data.version}</View>
        </View>
        <View>
          <View className={styles.line}>
            <View className="a-flex">
              <View>反馈QQ群</View>
            </View>
            <View className="a-link" onClick={() => Clipboard.copy("722942376")}>
              722942376
            </View>
          </View>
        </View>

        <View className={styles.line}>
          <View className="a-flex">
            <View>联系开发者</View>
          </View>
          <View className="a-link" onClick={() => Clipboard.copy("651525974")}>
            <View>651525974</View>
          </View>
        </View>

        <View className={styles.line}>
          <View className="a-flex">
            <View>项目开源地址</View>
          </View>
          <View
            className="a-link"
            onClick={() => Clipboard.copy("https://github.com/WindrunnerMax/SHST")}
          >
            点我复制链接
          </View>
        </View>

        <View className={styles.line}>
          <View className="a-flex">
            <View>项目更新日志</View>
          </View>
          <View
            className="a-link"
            onClick={() =>
              Clipboard.copy("https://github.com/WindrunnerMax/SHST/blob/dev/ChangeLog.md")
            }
          >
            点我复制链接
          </View>
        </View>

        <Button className={styles.line} open-type="share">
          <View className="a-flex">
            <View>分享山科小站</View>
          </View>
          <Icon type="arrow-right"></Icon>
        </Button>
      </View>

      <View className={styles.footer}>
        <View className={styles.text}>Copyright © 2020 WindrunnerMax</View>
      </View>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => ({ title: "山科小站", path: PATH.HOME });
Index.onShareTimeline = () => void 0;
