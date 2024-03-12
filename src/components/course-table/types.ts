export type CourseTableItem = {
  weekDay: number; // 周几的课 `0-6`
  serial: number; // 第几节 `0-4`
  data: string[][];
  background?: string; // 背景颜色 无则自动计算
};
export type CourseTableType = CourseTableItem[];
export type DefinedCourseRecord = Record<string, CourseTableItem>;
