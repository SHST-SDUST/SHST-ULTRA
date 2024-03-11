import { View } from "@tarojs/components";
import { cs } from "laser-utils";
import type { FC } from "react";
import React, { useState } from "react";

import { Dialog } from "../dialog";
import { Divider } from "../divider";
import { Dot } from "../dot";
import styles from "./index.module.scss";
import type { CourseTableItem, CourseTableType } from "./types";
import { getKey, TABLE_CONFIG } from "./utils";

export const TimeTable: FC<{
  className?: string;
  week: number;
  termStart?: string;
  timeTable: CourseTableType;
}> = props => {
  const [dialogContent, setDialogContent] = useState<CourseTableItem | null>(null);

  const table = props.timeTable;

  const onClose = () => {
    setDialogContent(null);
  };

  return (
    <View className={props.className}>
      {Array(TABLE_CONFIG.ROW)
        .fill(0)
        .map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View className="a-flex">
              <View className="a-flex a-flex-full">
                {Array(TABLE_CONFIG.COLUMN)
                  .fill(0)
                  .map((__, columnIndex) => (
                    <View key={columnIndex} className="a-flex a-flex-full">
                      <View className={cs("a-flex-full", styles.placeholder)}>
                        {table &&
                          table[getKey(columnIndex, rowIndex)] &&
                          ((item: CourseTableItem) => (
                            <View
                              onClick={() => setDialogContent(item)}
                              className={styles.tableBlock}
                              style={{ background: item.background }}
                            >
                              {item.data.map((it, index) => (
                                <View key={index}>{it}</View>
                              ))}
                            </View>
                          ))(table[getKey(columnIndex, rowIndex)])}
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            <Divider margin={3}></Divider>
          </React.Fragment>
        ))}

      <Dialog visible={!!dialogContent} onClose={onClose} className={styles.dialog}>
        {dialogContent &&
          dialogContent.data.map((item, index) => (
            <View key={index} className={cs("a-mt-10 a-mb-10 a-flex", index && "a-lmt")}>
              <Dot name={item}></Dot>
              <View className="a-lml">{item}</View>
            </View>
          ))}
      </Dialog>
    </View>
  );
};
