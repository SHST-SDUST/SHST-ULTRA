import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cs } from "laser-utils";
import { useState } from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { Clipboard } from "@/utils/clipboard";
import { CACHE, PATH } from "@/utils/constant";
import { Nav } from "@/utils/nav";
import { LocalStorage } from "@/utils/storage";

import { LOGO, TOUR_NAME } from "./constant";
import styles from "./index.module.scss";
import { requestForUserInfo } from "./model";

export default function Index() {
  const [name, setName] = useState(" ");
  const [point, setPoint] = useState("none");
  const [account, setAccount] = useState(" ");
  const [academy, setAcademy] = useState(" ");

  useOnLoadEffect(() => {
    LocalStorage.getPromise(CACHE.ANNOUNCE_INDEX).then(res => {
      if (res !== App.data.point) setPoint("block");
    });
    if (!App.data.isSHSTLogin) {
      setName(TOUR_NAME);
      setAccount(TOUR_NAME);
      setAcademy(TOUR_NAME);
      return void 0;
    }
    requestForUserInfo().then(res => {
      if (res) {
        setName(res.name);
        setAccount(res.account);
        setAcademy(res.academy);
      }
    });
  });

  const onGoToAnnounce = () => {
    setPoint("none");
    if (Taro.hideTabBarRedDot) Taro.hideTabBarRedDot({ index: 3 });
    Nav.to(PATH.POST);
  };

  return (
    <Layout>
      <View className="x-center">
        <Image className={styles.img} src={LOGO}></Image>
      </View>
      <View className={styles.userInfoContainer}>
        <View className={cs(styles.top, styles.line)}>
          <View>学号</View>
          <View>{account}</View>
        </View>
        <View className={styles.line}>
          <View>姓名</View>
          <View>{name}</View>
        </View>
        <View className={styles.line}>
          <View>学院</View>
          <View>{academy}</View>
        </View>
        <View className={styles.line} onClick={() => Clipboard.copy("722942376")}>
          <View>QQ群</View>
          <View>722942376</View>
        </View>
        <View className={styles.line} onClick={onGoToAnnounce}>
          <View className="a-flex">
            <View>公告</View>
            <View style={{ background: "green", display: point }} className={styles.point}></View>
          </View>
          <Icon type="arrow-right"></Icon>
        </View>
        <View className={styles.line} onClick={() => Nav.to(PATH.REWARD)}>
          <View>赞赏</View>
          <Icon type="arrow-right"></Icon>
        </View>
        <View className={styles.line} onClick={() => Nav.to(PATH.ABOUT)}>
          <View>关于</View>
          <Icon type="arrow-right"></Icon>
        </View>
      </View>
      <View
        className={cs("a-btn a-btn-orange a-btn-large", styles.btnFull)}
        onClick={() => Nav.to(PATH.LOGIN)}
      >
        注销
      </View>
    </Layout>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
