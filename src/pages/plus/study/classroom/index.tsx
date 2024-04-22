import type { CommonEventFunction, PickerViewProps } from "@tarojs/components";
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import { cs } from "laser-utils";
import React, { useState } from "react";

import { Dot } from "@/components/dot";
import { Layout } from "@/components/layout";
import { Loading } from "@/utils/loading";

import { NOW, QUERY_DATA, QUERY_FLOOR, QUERY_TIME } from "./constant";
import styles from "./index.module.scss";
import type { ClassItem } from "./model";
import { requestForClassRoom } from "./model";

export default function Index() {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState(NOW);
  const [rooms, setRooms] = useState<string[] | null>(null);
  const [prev, setPrev] = useState<Record<string, ClassItem>>({});
  const [next, setNext] = useState<Record<string, ClassItem>>({});
  const [index, setIndex] = useState<[number, number, number]>([0, 0, 0]);

  const onPickerChange: CommonEventFunction<PickerViewProps.onChangeEventDetail> = e => {
    setIndex(e.detail.value as [number, number, number]);
  };

  const onSearch = () => {
    Loading.start({ load: 2 });
    setTimeout(() => {
      const [dataIndex, timeIndex, floorIndex] = index;
      const date = QUERY_DATA[dataIndex][0];
      const time = QUERY_TIME[timeIndex][1];
      const floor = QUERY_FLOOR[floorIndex][1];
      const campus = QUERY_FLOOR[floorIndex][2];
      requestForClassRoom(date, time, floor, campus).then(res => {
        if (res) {
          setRooms(res.rooms);
          setPrev(res.prev);
          setNext(res.next);
          setSuffix(QUERY_TIME[timeIndex][2] + " " + date);
          setPrefix(QUERY_FLOOR[floorIndex][0]);
        }
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
              {QUERY_DATA.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[1]}
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn>
              {QUERY_TIME.map((item, key) => (
                <View className={styles.pickerItem} key={key}>
                  {item[0]}
                </View>
              ))}
            </PickerViewColumn>
            <PickerViewColumn>
              {QUERY_FLOOR.map((item, key) => (
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
        <Layout title={`${prefix}[${suffix}]`}>
          <View className={cs(styles.row, "y-center a-flex-space-between border-box")}>
            <View className="a-ml-5">教室</View>
            <View>本节课程</View>
            <View>下节课程</View>
          </View>
          {rooms.map((item, key) => (
            <View key={key} className={cs(styles.row, "y-center border-box")}>
              <View className="y-center">
                <Dot background="rgb(var(--arcoblue-6))"></Dot>
                <View>{prefix + "-" + item}</View>
              </View>
              <View className="y-center">
                <Dot background={prev[item] ? "#FF5722" : "#009688"}></Dot>
                <view className="text-ellipsis">{prev[item] ? prev[item].name : "无课"}</view>
              </View>
              <View className="y-center">
                <Dot background={next[item] ? "#FF5722" : "#009688"}></Dot>
                <View className="text-ellipsis">{next[item] ? next[item].name : "无课"}</View>
              </View>
            </View>
          ))}
        </Layout>
      )}
    </React.Fragment>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
