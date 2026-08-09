import type { ClassItem } from "./model";

export const htmlToClassroom = (text: string, date: string): ClassItem[] | { msg: string } => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  if (json.msg) {
    return { msg: json.msg };
  }
  const data = json[4];
  if (!data) {
    return [];
  }
  const weekday = new Date(date).getDay() || 7; // 周日为7，与PHP date("N")一致
  const offset = (weekday - 1) * 5 + 1;
  const result: ClassItem[] = [];
  for (const value of data) {
    const room = value[0];
    const type = value[38];
    const slice: boolean[] = value.slice(offset, offset + 5).map((it: unknown) => !!it);
    result.push({
      room,
      date: slice as ClassItem["date"],
      type,
    });
  }
  return result;
};
