import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Gap } from "@/components/gap";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { useStateRef } from "@/hooks/use-state-ref";
import { App } from "@/utils/app";
import { generateTerms } from "@/utils/terms";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import type { BookItem, QueryTerms } from "./model";
import { INIT_QUERY_TERMS, requestForBook } from "./model";

export default function Index() {
  const [tips, setTips] = useState("");
  const [text, setText] = useState("");
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<BookItem[]>([]);
  const [terms, setTerms, termsRef] = useStateRef<QueryTerms>(INIT_QUERY_TERMS);

  const initQueryTerms = () => {
    let [start, end, type] = App.data.curTerm.split("-").map(v => Number(v));
    if (type === 1) {
      type = 2;
    } else {
      type = 1;
      ++start;
      ++end;
    }
    const group: QueryTerms = [...generateTerms(end + 1, `${start}-${end}-${type}`)];
    setTerms(group);
  };

  const loadRemoteExam = (term: string) => {
    setText(term);
    requestForBook(term).then(res => {
      if (!res) {
        Toast.info("加载失败，请重试");
        return void 0;
      }
      if (res.length) {
        setData(res);
        setTips("");
      } else {
        setData([]);
        setTips("暂无教材信息");
      }
    });
  };

  useOnLoadEffect(() => {
    initQueryTerms();
    loadRemoteExam(termsRef.current[0]?.value || App.data.curTerm);
  });

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    loadRemoteExam(terms[current].value);
  };

  return (
    <React.Fragment>
      <Layout title="教材查询">
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
            <Dot name={item.book_name}></Dot>
            <View className="text-ellipsis">{item.book_name}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>ISBN: {item.isbn}</View>
            <View className="a-lml">课程代码: {item.no}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>作者: {item.author || "无"}</View>
            <View className="a-lml">出版社: {item.publisher || "无"}</View>
            <View className="a-lml">出版时间: {item.publish_time || "无"}</View>
          </View>
          <View className="y-center a-fontsize-12 a-lmt a-color-grey">
            <View>课程: {item.classname || "无"}</View>
            <View className="a-lml">类型: {item.type || "无"}</View>
            <View className="a-lml">班级订购: {item.nums}</View>
          </View>
        </Layout>
      ))}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
