import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Divider } from "@/components/divider";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import styles from "./index.modules.scss";
import type { CreditItem, DetailItem, TypedItem } from "./model";
import { requestForSituation } from "./model";

export default function Index() {
  const [credit, setCredit] = useState<CreditItem[]>([]);
  const [typed, setTyped] = useState<TypedItem[]>([]);
  const [detail, setDetail] = useState<DetailItem[]>([]);

  useOnLoadEffect(() => {
    requestForSituation().then(res => {
      setCredit(res.credit);
      setTyped(res.typed);
      setDetail(res.detail);
    });
  });

  return (
    <React.Fragment>
      <Layout title="修读情况">
        <View className={cs(styles.row, "y-center text-center a-lmt a-lmb")}>
          <View>性质</View>
          <View>要求</View>
          <View>已修</View>
          <View>未修</View>
          <View>修读</View>
        </View>
        <Divider></Divider>
        {credit.map((item, index) => (
          <React.Fragment key={index}>
            <View className={cs(styles.row, "y-center text-center a-lmt a-lmb")}>
              <View>{item.type}</View>
              <View>{item.need}</View>
              <View>{item.finish}</View>
              <View>{item.undo}</View>
              <View>{item.doing}</View>
            </View>
            <Divider></Divider>
          </React.Fragment>
        ))}
      </Layout>

      <Layout title="公选模块">
        <View className={cs(styles.row, "y-center text-center a-lmt a-lmb")}>
          <View>模块</View>
          <View>要求</View>
          <View>已修</View>
          <View>未修</View>
          <View>修读</View>
        </View>
        <Divider></Divider>
        {typed.map((item, index) => (
          <React.Fragment key={index}>
            <View className={cs(styles.row, "y-center text-center a-lmt a-lmb")}>
              <View>{item.type}</View>
              <View>{item.need}</View>
              <View>{item.finish}</View>
              <View>{item.undo}</View>
              <View>{item.doing}</View>
            </View>
            <Divider></Divider>
          </React.Fragment>
        ))}
      </Layout>

      <Layout title="修读详情">
        {detail.map((item, index) => (
          <React.Fragment key={index}>
            <View className="y-center a-lmt a-flex-none">
              <Dot name={item.name}></Dot>
              <View className="text-ellipsis">{item.name}</View>
            </View>
            <View className="y-center a-lmt a-lmb">
              <View>代码: {item.no}</View>
              <View className="a-lml">学分: {item.credit}</View>
              <View className="a-lml">成绩: {item.grade}</View>
              <View className="a-lml">类型: {item.type}</View>
            </View>
            <Divider></Divider>
          </React.Fragment>
        ))}
      </Layout>
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
