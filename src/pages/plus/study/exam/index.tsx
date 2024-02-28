import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Gap } from "@/components/gap";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { generateTerms } from "@/utils/terms";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { type ExamType, INIT_QUERY_TERMS, type QueryTerms, requestForExam } from "./model";

export default function Index() {
  const [tips, setTips] = useState("");
  const [text, setText] = useState("");
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<ExamType[]>([]);
  const [terms, setTerms] = useState<QueryTerms>(INIT_QUERY_TERMS);

  const initQueryTerms = () => {
    const group: QueryTerms = [...generateTerms()];
    setTerms(group);
  };

  const loadRemoteExam = (term: string) => {
    setText(term);
    requestForExam(term).then(res => {
      if (!res) {
        Toast.info("加载失败，请重试");
        return void 0;
      }
      if (res.length) {
        setTips("");
        setData(res);
      } else {
        setTips("暂无考试信息");
        setData([]);
      }
    });
  };

  useOnLoadEffect(() => {
    initQueryTerms();
    loadRemoteExam(App.data.curTerm);
  });

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    loadRemoteExam(terms[current].value);
  };

  return (
    <React.Fragment>
      <Layout title="考试查询">
        <View className={styles.selector}>
          <View>请选择学期</View>
          <Picker
            value={index}
            range={terms}
            className="a-link"
            range-key="show"
            onChange={onPickChange}
          >
            <View>{terms[index].show}</View>
          </Picker>
        </View>
      </Layout>

      <Banner title={text}></Banner>
      <Gap size={10}></Gap>
      {tips && (
        <Layout>
          <View className="y-center">
            <Dot type="fill-3"></Dot>
            <View>{tips}</View>
          </View>
        </Layout>
      )}
      {data.map((item, key) => (
        <Layout key={key}>
          <View className="y-center a-fontsize-15">
            <Dot name={item.name}></Dot>
            <View className="text-ellipsis">{item.name}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View className="text-ellipsis">课程代码: {item.no}</View>
            <View className="a-lml">教室: {item.classroom}</View>
            <View className="a-lml">位置: {item.location || "无"}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>{item.time}</View>
          </View>
        </Layout>
      ))}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
