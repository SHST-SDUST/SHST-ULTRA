import { Image, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React from "react";

import { EXPLORATION, TODAY } from "@/utils/constant";
import { Preview } from "@/utils/preview";

import { REWARD_IMAGE } from "./constant";
import styles from "./index.module.scss";

export default function Index() {
  return (
    <React.Fragment>
      {TODAY > EXPLORATION && (
        <React.Fragment>
          <View className="x-center">
            <Image
              className={styles.rewardImg}
              src={REWARD_IMAGE}
              onClick={() => Preview.image(REWARD_IMAGE)}
            ></Image>
          </View>

          <View className={cs("tips-con", styles.tipsReward)}>
            <View>点击二维码后长按识别赞赏码</View>
            <View>记得写上您的名字哦</View>
            <View>感谢您的支持!</View>
          </View>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
