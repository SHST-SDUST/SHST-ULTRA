import type { CourseTableItem } from "@/components/course-table/types";
import { App } from "@/utils/app";
import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToCourses } from "./parser";

export const requestForCourses = (academy: string): Promise<Record<string, CourseTableItem[]>> => {
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "POST",
    url: SW_HOST + "kbcx/kbxx_teacher_ifr",
    data: {
      xnxqh: App.data.curTerm,
      skyx: academy,
      jszc: "",
      zc1: "",
      zc2: "",
      jc1: "",
      jc2: "",
    },
  }).then(res => {
    return htmlToCourses(res.data);
  });
};
