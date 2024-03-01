import { SW_HOST } from "@/utils/constant";
import { HTTP } from "@/utils/request";

import { htmlToPlans } from "./parser";

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
  return HTTP.request<string>({
    load: 3,
    url: SW_HOST + "pyfa/pyfa_query",
  }).then(res => {
    return htmlToPlans(res.data);
  });
};
