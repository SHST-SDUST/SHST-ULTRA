/* eslint-disable @typescript-eslint/no-unused-vars */
import { HTTP } from "@/utils/request";

import { htmlToClassroom } from "./parser";

export type ClassItem = {
  classroom: string;
  grade: string;
  name: string;
  teacher: string;
};

let view =
  "cIiMNhTKWZFhxIJ1PE++38xt13HyJ14ED4ihFb80jF2osvb76T8rfEB38WeG47iSla/yuXIgiCnRqR7WpoMQ4qW5tgOd8WRy7HnndjQaDmn7lpifqiZYjqSNE6hnrnnhKMEuZITDxtWDpn71T7XKW5ZVqjqRQr1He3RYOpwBjs0CI/JeVwzGLq2+osZABqm3IY4VZHSfVMkFSHiNMxYRgHw8LgtY89IgclLNbnQYwZsHRfmOFzp9OcSP+TNclATwA8x1lrBnMMIrF/zldaEGfr6zh9b/+6YZj/7hpaqQo2D2u4CeYd2QX2dvkKevnmxGgA+1n/qYBCmUGhsYcL/gGP8FWs2eddTBrKTfLNxTtMZk94rhvDAURFjxEdGRk6vFc8fFRYrMgpAF76oE/HfLrxIJVZgpifZNwEZArW4hTj5RWPgcPIucw5fKW1QY9+S2DBo5l2tl3i9pJnX/hj2NQm+/iwRcWKAX1TV0CIfaXfYcPKLyWvjlpN4KCg5bZaMZMLz5Q13ZQXLsRPsUi7ZgrPzgJ3OXe1R4dpSUbLnseSv9rO6nZpVe360rFXwBMxMtxZDfUbJYZZF7w3BmdTG+vZyGO/MSfWJs79wMjwik8wz1AksQDEOzgjqwOlmsB7lJAZbxog6AGiTMUJqN7kBiDqLAspdY8aV6kJ9Q4u3rQkwGUbgwkKc2oVABe8JFosbZtxmQliB4MB32D9inNPVbUdCuKEZZ3/fombSJ1hTBol69HzYw30sgSeuWYRu4zHS0sXt7yFiPi3JvrYV/Cjn+zcdtGCDD7YKKbkvLWW1e42xFd4GC0qoU2EY1hG9fbd2am5Tsa3sgagFbOPYeczkyetx9oik9mJ4tzD5zAMQiWPYsiQdcBLyeSKPoTBSCiiy9REcE4KgrMJUVXFhvFBqCm43kigAIi6c/3+/vqlbs81EJ/UBmEtG3Wugm/vCyzNoB/cfPcrV7mOXyCf5C/faf8a0+mPVmwyD3rXul7BKkkCrAfHVg+/I8JXEr/kHfnXcU9knls2jjJHjAhzVL3Y0AK5c/QxBbhkAz5o354lkjty5me4m35BYeQme9UcAx1oQU5j1Wlg2Y2utad5jORh/SAA==";
let generator = "193192EE";
let action =
  "Muj7LJAxfXFeTrM5falovAcZJygZRfbqPJSGkeb4s4uIbcCY2y/XV0vn3FAaumEKE87TSimvc8xbSsqfi+8sewpzprR1xJro/mHniyMLigcK6PqkGoonY6+Gjw8FQjEHEDNXul+ilGWcCaqO/t9YYz+4yAd+UMnaOSyyymPH6SpvOeiWSK4oruM3zoI5/fXaScNepNlZMQQcLCJ48RRWn3pMQvkXKagLfsHE9SIGuP3AyH8rISioHEfYxNRaEbEiE474W8SCozHMaSqt8JFehtbw2lZ/Q26PtQb6VRXPavGrSmEgVwPPNPf+7gaJKnPB7f+V9PFMatFLeGwf1uJWvAs7CsKzi9ovslhRXtED3h3vT29EPH5INFnyb9V34TnWluChCOxj92uk3bjlPjsUp4Af+iN3KSImV/hRLxrQthFMBQSig0auD1UFsucy7k57o10wiwqKG8iZkLJv90p79AM7Mq94wO4KCKx2g+LOfeEsQHLQgJm0h/QEEHMVjHUd";

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
  return HTTP.request<string>({
    load: 0,
    throttle: true,
    method: "POST",
    url: "https://xxfw.sdust.edu.cn/skdDoor/KCB/BuildingCalendar.aspx",
    data: {
      __EVENTTARGET: "ddl_section",
      __EVENTARGUMENT: "",
      __LASTFOCUS: "",
      tb_date: date.replace(/-/g, "/"),
      ddl_building: floor,
      ddl_section: time,
      hasClassOrNot: "radioAll",
      campus: campus,
      __VIEWSTATE: view,
      __VIEWSTATEGENERATOR: generator,
      __EVENTVALIDATION: action,
    },
  }).then(res => {
    const html = res.data;
    const data = htmlToClassroom(html);
    view = data.STATE.view || view;
    generator = data.STATE.generator || generator;
    action = data.STATE.action || action;
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
