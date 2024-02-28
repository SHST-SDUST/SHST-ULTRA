import { View } from "@tarojs/components";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";

import type { PlanItem } from "./model";
import { requestForPlan } from "./model";

export default function Index() {
  const [tips, setTips] = useState<string>("");
  const [list, setList] = useState<PlanItem[]>([]);

  useOnLoadEffect(() => {
    requestForPlan().then(res => {
      setTips(res.length !== 0 ? "" : "暂无执行计划信息");
      setList(res.length !== 0 ? res.filter(Boolean) : []);
    });
  });

  return (
    <React.Fragment>
      <Banner title="执行计划"></Banner>

      <View className="a-gap-10"></View>

      {tips && (
        <Layout>
          <View className="y-center">
            <Dot></Dot>
            <View>{tips}</View>
          </View>
        </Layout>
      )}

      {list.map((item, index) => (
        <Layout key={index}>
          <View className="y-center a-fontsize-15">
            <Dot name={item.name}></Dot>
            <View className="text-ellipsis">{item.name}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View className="text-ellipsis">代码: {item.no}</View>
            <View className="a-lml">学时: {item.period}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>类型: {item.type}</View>
            <View className="a-lml">学分: {item.credit}</View>
            <View className="a-lml">考察: {item.examine}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>学期: {item.term}</View>
            <View className="a-lml">学院: {item.unit}</View>
          </View>
        </Layout>
      ))}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
