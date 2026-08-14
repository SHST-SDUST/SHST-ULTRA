import type { CourseTableItem } from "@/components/course-table/types";
import { App } from "@/utils/app";
import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToCourses } from "./parser";

export const requestForCourses = (academy: string): Promise<Record<string, CourseTableItem[]>> => {
  return HTTP.request<string>({
    load: 2,
    throttle: true,
    method: "GET",
    url: SW_HOST + "kbcx/kbxx_teacher_ifr",
    data: {
      pageNum: 1,
      pageSize: 999999,
      xnxq01id: App.data.curTerm,
      jsyx: academy,
      jszc: "",
      jsxx: "",
      zc1: "",
      zc2: "",
      skxq1: "",
      skxq2: "",
      jc1: "",
      jc2: "",
    },
  }).then(res => {
    return htmlToCourses(res.data);
  });
};
