import { RegExec as R } from "@/utils/regex";

import type { ClassItem } from "./model";

export const htmlToClassroom = (html: string) => {
  const now: ClassItem[] = [];
  const next: ClassItem[] = [];
  const state: Record<string, string> = {};
  const text = R.exec(/script>var[\s\S]*?<\/script/, html)
    .replace(/<br \/>/g, "|")
    .replace(/室/g, "")
    .replace(/（/g, "(")
    .replace(/）/g, ")");
  const roomsTemp = R.exec(/roomlist = (.*?);/, text);
  const roomsData: number[] = JSON.parse(roomsTemp) || [];
  const nowTemp = R.exec(/dictionary = (.*?);/, text);
  const nowData: Record<string, string> = JSON.parse(nowTemp) || [];
  const nextTemp = R.exec(/dictionary_next = (.*?);/, text);
  const nextData: Record<string, string> = JSON.parse(nextTemp) || [];
  const rooms: number[] = roomsData;
  state.view = R.exec(/<input[\s\S]*?name="__VIEWSTATE"[\s\S]*?value="(.*?)"/, html);
  state.generator = R.exec(/<input[\s\S]*?name="__VIEWSTATEGENERATOR"[\s\S]*?value="(.*?)"/, html);
  state.action = R.exec(/<input[\s\S]*?name="__EVENTVALIDATION"[\s\S]*?value="(.*?)"/, html);
  for (const [key, value] of Object.entries(nowData)) {
    const data = value.split("|");
    now.push({
      classroom: key,
      name: data[0] || "",
      teacher: data[1] || "",
      grade: data[2] || "",
    });
  }
  for (const [key, value] of Object.entries(nextData)) {
    const data = value.split("|");
    next.push({
      classroom: key,
      name: data[0] || "",
      teacher: data[1] || "",
      grade: data[2] || "",
    });
  }
  return { now, next, rooms, STATE: state };
};
