import { Image, View } from "@tarojs/components";
import { cs } from "laser-utils";
import { type FC, useEffect, useState } from "react";

import { PROD_HOST } from "@/utils/constant";
import { Toast } from "@/utils/toast";

import { Divider } from "../divider";
import styles from "./index.module.scss";
import { requestWeatherData } from "./model";

const CLEAR = "CLEAR_DAY";
const STATIC_PATH = PROD_HOST + "/public/static/weather/";

export const Weather: FC<{
  className?: string;
}> = props => {
  const [sky, setSky] = useState<string>(CLEAR);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [desc, setDesc] = useState<string>("数据获取中");
  const [future, setFuture] = useState<string[]>(Array(5).fill(CLEAR));

  useEffect(() => {
    requestWeatherData().then(res => {
      if (res) {
        setSky(res.sky);
        setMin(res.min);
        setMax(res.max);
        setDesc(res.desc);
        setFuture(res.future);
      }
    });
  }, []);

  return (
    <View className={cs(props.className)}>
      <View className={styles.overview}>
        <Image
          className={cs(styles.icon, "a-lmr")}
          mode="aspectFit"
          src={`${STATIC_PATH + sky}.png`}
        ></Image>
        <View>{`${min}°C - ${max}°C`}</View>
        <View className="text-ellipsis a-flex-full a-lml" onClick={() => Toast.info(desc)}>
          <View className="text-ellipsis">{desc}</View>
        </View>
      </View>
      <Divider margin={9}></Divider>
      <View className={styles.list}>
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <Image
              className={styles.icon}
              key={index}
              mode="aspectFit"
              src={`${STATIC_PATH + future[index % 5]}.png`}
            ></Image>
          ))}
      </View>
    </View>
  );
};
