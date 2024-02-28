import { App } from "@/utils/app";
import { HTTP } from "@/utils/request";

export type PlanItem = {
  no: string;
  name: string;
  period: string;
  type: string;
  credit: string;
  examine: string;
  term: string;
  unit: string;
};

export const requestForPlan = () => {
  return HTTP.request<{ info: PlanItem[] }>({
    load: 3,
    url: App.data.url + "/plus/complyPlan",
  }).then(res => {
    if (!res.data) return [];
    return res.data.info;
  });
};
