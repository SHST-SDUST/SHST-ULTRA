import { Button, Image, Navigator, RichText, Swiper, SwiperItem, View } from "@tarojs/components";
import { cs, DateTime } from "laser-utils";
import React, { useEffect, useState } from "react";

import { Dot } from "@/components/dot";
import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { OneSentence } from "@/components/one-sentence";
import type { TimeTableType } from "@/components/time-table/types";
import { Weather } from "@/components/weather";
import { PATH } from "@/config/page";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { parseTimeTable } from "@/pages/func/study/timetable/model";
import { App } from "@/utils/app";
import { Event, EVENT_ENUM } from "@/utils/event";
import { Nav } from "@/utils/nav";

import styles from "./index.module.scss";
import { requestTimeTable, type SwiperItemType } from "./model";

const NOW = new DateTime().format("yyyy-MM-dd K");

export default function Index() {
  const [swiper, setSwiper] = useState<SwiperItemType[]>([]);
  const [post, setPost] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [table, setTable] = useState<TimeTableType>([]);
  const [tips, setTips] = useState("数据加载中");
  const [tipsContent, setTipsContent] = useState("数据加载中");

  const getTimeTable = (cache = true, load = 1, throttle = false) => {
    requestTimeTable(cache, load, throttle).then(res => {
      if (res) {
        const list = parseTimeTable(res.data, true);
        if (!list.length) {
          setTips("No Class Today");
          setTipsContent("今天没有课，快去自习室学习吧");
        } else {
          setTips("");
          setTipsContent("");
          setTable(list);
        }
      } else {
        setTips("加载失败");
        setTipsContent("加载失败了，重新登录试一下");
      }
    });
  };

  const onInit = () => {
    setSwiper(App.data.initData.ads);
    setPost(App.data.initData.articalName);
    setPostUrl(App.data.initData.articleUrl);
    if (!App.data.isSHSTLogin) {
      setTips("点我前去绑定教务系统账号");
      setTipsContent("绑定强智教务系统就可以使用山科小站咯");
    }
    getTimeTable();
  };
  useOnLoadEffect(onInit);

  const bindSHST = () => {
    !App.data.isSHSTLogin && Nav.webview(PATH.LOGIN);
  };

  useEffect(() => {
    const handler = () => getTimeTable(false, 2, true);
    Event.on(EVENT_ENUM.REFRESH_TIMETABLE, handler);
    return () => {
      Event.off(EVENT_ENUM.REFRESH_TIMETABLE, handler);
    };
  }, []);

  return (
    <React.Fragment>
      {/* `Banner` */}
      <Layout>
        <View className={styles.swiperContainer}>
          <Swiper indicatorDots interval={5000} duration={1000} autoplay circular>
            {swiper.map((item, index) => (
              <SwiperItem
                key={index}
                className="x-center y-center"
                onClick={() => Nav.webview(item.url)}
              >
                <Image className="x-full" mode="aspectFill" src={item.img} lazyLoad></Image>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </Layout>

      {/* 天气 */}
      <Layout
        topSpace
        title={NOW}
        captainSlot={
          <View className="y-center">
            <Icon
              className="a-lmr"
              type="shuaxin"
              onClick={() => getTimeTable(false, 2, true)}
            ></Icon>
            <Button
              open-type="share"
              className={cs("shst-icon icon-fenxiang", styles.shareButton)}
            ></Button>
          </View>
        }
      >
        <Weather></Weather>
      </Layout>

      {/* 公告 */}
      <Layout title="系统公告">
        <View className={cs(styles.article, "text-ellipsis")} onClick={() => Nav.webview(postUrl)}>
          <Icon space type="gonggao" className="a-lmr" size={16}></Icon>
          <RichText className="a-link" nodes={post}></RichText>
        </View>
        <Navigator
          url={PATH.POST}
          open-type="navigate"
          className={cs(styles.article, "text-ellipsis")}
          hover-class="none"
        >
          <Icon space type="gonggao" className="a-lmr" size={16}></Icon>
          <text className="a-link">更多公告...</text>
        </Navigator>
      </Layout>

      {/* 今日课程 */}
      <Layout title="今日课程">
        {table.map((item, index) => (
          <View key={index} className={styles.tableItem}>
            <View className="y-center a-mr a-mt">
              <Dot background={item.background || ""}></Dot>
              <View className="a-lmr">
                第{2 * (item.serial + 1) - 1}
                {2 * (item.serial + 1)}节
              </View>
              <View>{item.teacher}</View>
            </View>
            <View className="y-center a-lmt a-mb">
              <View className="a-ml a-lmr">{item.className}</View>
              <View>{item.classRoom}</View>
            </View>
          </View>
        ))}
        {tips && (
          <View className={styles.tableItem} onClick={bindSHST}>
            <View className="y-center a-mt a-mr">
              <Dot type="fill-3"></Dot>
              <View>{tips}</View>
            </View>
            <View className="a-lmt a-mb a-ml a-mr">{tipsContent}</View>
          </View>
        )}
      </Layout>

      {/* 每日一句 */}
      <Layout title="每日一句">
        <OneSentence></OneSentence>
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
