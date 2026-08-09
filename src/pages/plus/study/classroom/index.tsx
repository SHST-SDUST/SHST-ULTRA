import type { CommonEventFunction, PickerViewProps } from "@tarojs/components";
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import React, { useState } from "react";

import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { Loading } from "@/utils/loading";

import { NOW, QUERY_CAMPUS, QUERY_DATA } from "./constant";
import styles from "./index.module.scss";
import type { ClassItem } from "./model";
import { requestForClassRoom } from "./model";

export default function Index() {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState(NOW);
  const [rooms, setRooms] = useState<ClassItem[] | null>(null);
  const [index, setIndex] = useState<[number, number]>([0, 0]);

  const onPickerChange: CommonEventFunction<PickerViewProps.onChangeEventDetail> = e => {
    setIndex(e.detail.value as [number, number]);
  };

  const onSearch = () => {
    Loading.start({ load: 2 });
    setRooms(null);
    setTimeout(() => {
      const [campusIndex, dataIndex] = index;
      const campus = QUERY_CAMPUS[campusIndex][1];
      const date = QUERY_DATA[dataIndex][1];
      requestForClassRoom(campus, date).then(res => {
        setRooms(res);
        setPrefix(QUERY_CAMPUS[campusIndex][0]);
        setSuffix(QUERY_DATA[dataIndex][0]);
        Loading.end({ load: 2 });
      });
    }, 100);
  };

  return (
    <React.Fragment>
      <Layout title="空教室" topSpace>
        <View className="text-center a-flex-space-between a-lmt">
          <PickerView
            className={styles.pickerContainer}
            indicator-style="height: 40px;"
            onChange={onPickerChange}
          >
            <PickerViewColumn>
              {QUERY_CAMPUS.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[0]}
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn>
              {QUERY_DATA.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[0]}
                </View>
              ))}
            </PickerViewColumn>
          </PickerView>
          <View className="y-center">
            <View className="a-btn a-btn-blue" onClick={onSearch}>
              搜索
            </View>
          </View>
        </View>
      </Layout>

      {rooms && (
        <Layout title={`${prefix}-[${suffix}]`}>
          <View className={styles.row}>
            <View className={styles.classRoom}>教室名称</View>
            <View className={styles.cell}>0102</View>
            <View className={styles.cell}>0304</View>
            <View className={styles.cell}>0506</View>
            <View className={styles.cell}>0708</View>
            <View className={styles.cell}>0910</View>
          </View>
          {rooms.map((item, key) => (
            <View className={styles.row} key={key}>
              <View className={styles.classRoom}>{item.room}</View>
              {item.date.slice(0, 5).map((placed, key2) => (
                <View className={styles.cell} key={key2}>
                  <Dot background={placed ? "rgb(var(--red-5))" : "rgb(var(--green-5))"} />
                </View>
              ))}
            </View>
          ))}
        </Layout>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
