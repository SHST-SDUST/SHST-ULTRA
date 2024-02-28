export type TimeTableItem = {
  weekDay: number; // 周几的课 `0-6`
  serial: number; // 第几节 `0-4`
  className: string; // 课程名
  classRoom: string; // 教室名
  teacher: string; // 教师名
  ext?: string; // 扩展信息
  background?: string; // 背景颜色 无则自动计算
  isCurWeek?: boolean; // 若为该周的课 则优先显示
};
export type TimeTableType = TimeTableItem[];

export type DateRowItem = { weekDay: string; date: string; today: boolean };
export type DateRowType = DateRowItem[];

export type DefinedTableItem = { simple: TimeTableItem; all: TimeTableItem[] };
export type DefinedTableRecord = Record<string, DefinedTableItem>;
