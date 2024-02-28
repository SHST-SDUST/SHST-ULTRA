/* eslint-disable @typescript-eslint/no-unused-vars */
import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";
import { Toast } from "@/utils/toast";

export type ClassItem = {
  classroom: string;
  grade: string;
  name: string;
  teacher: string;
};
export type RemoteClassRoom = {
  info: {
    rooms: number[];
    now: ClassItem[];
    next: ClassItem[];
  };
  status: number;
};

export const requestForClassRoom = (
  date: string,
  time: string,
  floor: string,
  campus: number
): Promise<{
  rooms: string[];
  prev: Record<string, ClassItem>;
  next: Record<string, ClassItem>;
} | null> => {
  return HTTP.request<RemoteClassRoom>({
    load: 0,
    throttle: true,
    url: App.data.url + "/plus/classroom",
    data: {
      date: date,
      series: time,
      build: floor,
      campus: campus,
    },
  }).then(res => {
    const data = res.data.info;
    if (!data) {
      Toast.info("加载失败，请重试");
      return null;
    }
    const rooms = data.rooms.map(v => v.toString());
    const prev: Record<string, ClassItem> = {};
    const next: Record<string, ClassItem> = {};
    data.now.forEach(v => {
      const [_, room] = v.classroom.split("-");
      prev[room] = v;
    });
    data.next.forEach(v => {
      const [_, room] = v.classroom.split("-");
      next[room] = v;
    });
    return { rooms, prev, next };
  });
};
