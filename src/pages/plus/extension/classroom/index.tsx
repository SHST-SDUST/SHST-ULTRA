import type { CommonEventFunction, PickerSelectorProps } from "@tarojs/components";
import { Picker, View } from "@tarojs/components";
import React, { useMemo, useRef, useState } from "react";

import { CourseTimeTable } from "@/components/course-table";
import type { CourseTableItem } from "@/components/course-table/types";
import { Layout } from "@/components/layout";
import { Toast } from "@/utils/toast";

import { QUERY_FLOOR } from "./constant";
import styles from "./index.module.scss";
import { requestForCourses } from "./model";

export default function Index() {
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState<number>(0);
  const [courseTags, setCourseTags] = useState<string[]>([]);
  const [classRoomIndex, setClassRoomIndex] = useState<number>(0);
  const courseMap = useRef<Record<string, CourseTableItem[]>>({});
  const [courseData, setCourseData] = useState<CourseTableItem[]>([]);
  const buildingRange = useMemo(() => ["请选择", ...QUERY_FLOOR.map(it => it[0])], []);

  const loadCourseData = (region: string, building: string) => {
    return requestForCourses(region, building).then(data => {
      courseMap.current = data;
      const keys = Object.keys(data);
      setLoaded(true);
      if (!keys.length) {
        Toast.info("暂无课程信息");
        setLoaded(false);
        setCourseTags([]);
        setCourseData([]);
      } else {
        const first = keys[0];
        setCourseTags(keys);
        setCourseData(data[first] || []);
      }
    });
  };

  const onPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setIndex(current);
    setLoaded(false);
    setClassRoomIndex(0);
    if (current === 0) return void 0;
    setText(buildingRange[current]);
    const data = QUERY_FLOOR[current - 1];
    loadCourseData(data[2], data[1]);
  };

  const onClassRoomPickChange: CommonEventFunction<PickerSelectorProps.ChangeEventDetail> = e => {
    const current = e.detail.value as number;
    setClassRoomIndex(current);
    setCourseData(courseMap.current[courseTags[current]] || []);
  };

  return (
    <React.Fragment>
      <Layout title="教室课表">
        <View className={styles.selector}>
          <View>请选择教学楼</View>
          <Picker value={index} range={buildingRange} className="a-link" onChange={onPickChange}>
            <View>{buildingRange[index]}</View>
          </Picker>
        </View>
      </Layout>
      {loaded && (
        <Layout
          title={text}
          captainSlot={
            <Picker
              value={classRoomIndex}
              range={courseTags}
              className="a-link a-fontsize-13"
              onChange={onClassRoomPickChange}
            >
              <View>{courseTags[classRoomIndex]}</View>
            </Picker>
          }
        >
          <CourseTimeTable timeTable={courseData}></CourseTimeTable>
        </Layout>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
