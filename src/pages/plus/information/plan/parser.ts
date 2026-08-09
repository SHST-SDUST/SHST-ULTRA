import type { PlanItem } from "./model";

export const htmlToPlans = (text: string): PlanItem[] => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  if (!json) {
    return [];
  }
  const plans: PlanItem[] = [];
  for (const value of json.data) {
    plans.push({
      no: value.kch || "",
      name: value.kc_mc || "",
      period: value.zxs || "",
      type: value.kclb_mc || "",
      credit: value.xf || "",
      examine: value.khlb_mc || "",
      term: value.kkxq || "",
      unit: value.yx_mc || "",
    });
  }
  return plans;
};
