import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Banner } from "@/components/banner";
import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { useOnLoadEffect } from "@/hooks/use-onload-effect";
import { App } from "@/utils/app";
import { generateTerms } from "@/utils/terms";
import { Toast } from "@/utils/toast";

import styles from "./index.module.scss";
import { type GradeType, INIT_QUERY_TERMS, type QueryTerms, requestForGrade } from "./model";

export default function Index() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState<number>(1);
  const [point, setPoint] = useState<number>(0);
  const [pointN, setPointN] = useState<string>("0");
  const [pointW, setPointW] = useState<string>("0");
  const [data, setData] = useState<GradeType[]>([]);
  const [terms, setTerms] = useState<QueryTerms>(INIT_QUERY_TERMS);

  const initQueryTerms = () => {
    const group: QueryTerms = [{ show: "全部学期", value: "" }, ...generateTerms()];
    setTerms(group);
  };

  const getRemoteGrade = (term: string, title?: string) => {
    setText(title || term);
    requestForGrade(term).then(res => {
      if (!res) {
        Toast.info("加载失败，请重试");
        return void 0;
      }
      let creditTmp = 0;
      let gpaTmp = 0;
      let weightedTmp = 0;
      let counter = 0;
      for (const v of res) {
        if (v.type === "公选") continue;
        const c = parseFloat(v.credit) || 0;
        const g = parseFloat(v.gpa) || 0;
        creditTmp = creditTmp + c;
        gpaTmp = gpaTmp + g;
        weightedTmp = weightedTmp + c * g;
        ++counter;
      }
      setPoint(creditTmp);
      setPointN((counter ? (gpaTmp / counter).toFixed(2) : 0).toString());
      setPointW((creditTmp ? (weightedTmp / creditTmp).toFixed(2) : 0).toString());
      const defaultValue: GradeType = {
        credit: "",
        gpa: "5",
        grade: "100",
        makeup: "",
        minor: "",
        name: term + "学期暂无成绩",
        no: "无",
        rebuild: "",
        type: "无",
      };
      const list = !res.length ? [defaultValue] : res;
      setData(list);
    });
  };

  useOnLoadEffect(() => {
    initQueryTerms();
    getRemoteGrade(App.data.curTerm);
  });

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    getRemoteGrade(terms[current].value, terms[current].show);
  };

  return (
    <React.Fragment>
      <Layout title="查成绩">
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

      {data.length > 0 && (
        <React.Fragment>
          <Banner title={text}>
            <View className="y-center a-fontsize-13 a-flex-wrap">
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#6495ed"></Dot>
                <View>学分:{point}</View>
              </View>
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#aca4d5"></Dot>
                <View>绩点:{pointN}</View>
              </View>
              <View className={cs("y-center", styles.overview)}>
                <Dot background="#eaa78c"></Dot>
                <View>加权:{pointW}</View>
              </View>
            </View>
          </Banner>
          <View className="a-lmt"></View>
          {data.map((item, key) => (
            <Layout key={key}>
              <View className="y-center a-fontsize-15">
                <Dot name={item.name}></Dot>
                <View className="text-ellipsis">{item.name}</View>
              </View>
              <View className="y-center a-fontsize-12 a-lmt a-color-grey">
                <View className="text-ellipsis">课程代码: {item.no}</View>
                <View className="a-lml">类型: {item.type}</View>
              </View>
              <View className="y-center a-fontsize-12 a-lmt a-color-grey">
                <View>成绩: {item.grade}</View>
                <View className="a-lml">补考: {item.makeup || "无"}</View>
                <View className="a-lml">重修: {item.rebuild || "无"}</View>
                <View className="a-lml">绩点: {item.gpa}</View>
                <View className="a-lml">学分: {item.credit}</View>
              </View>
            </Layout>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
