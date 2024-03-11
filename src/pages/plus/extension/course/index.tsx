import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import React, { useMemo, useState } from "react";

import type { CourseTableItem } from "@/components/course-table/types";
import { Layout } from "@/components/layout";

import { QUERY_FLOOR } from "./constant";
import styles from "./index.module.scss";

export default function Index() {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const [courseIndex, setCourseIndex] = useState<number>(0);
  const [courseName, setCourseName] = useState<string[]>([]);
  const [courseData, setCourseData] = useState<CourseTableItem[]>([]);
  const terms = useMemo(() => ["请选择", ...QUERY_FLOOR.map(it => it[0])], []);

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    setLoaded(false);
    setText(terms[current]);
    setCourseIndex(0);
  };

  return (
    <React.Fragment>
      <Layout title="教室课表">
        <View className={styles.selector}>
          <View>请选择教学楼</View>
          <Picker
            value={index}
            range={terms}
            className="a-link"
            range-key="show"
            onChange={onPickChange}
          >
            <View>{terms[index]}</View>
          </Picker>
        </View>
      </Layout>
      {loaded && <Layout title={text}></Layout>}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
