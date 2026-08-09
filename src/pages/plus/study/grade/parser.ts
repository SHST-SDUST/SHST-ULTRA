import type { GradeType } from "./model";

export const htmlToGrades = (text: string): GradeType[] => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  if (!json) {
    return [];
  }
  const grades: GradeType[] = [];
  for (const value of json.data) {
    const kcxz = value.ksxz || "";
    grades.push({
      no: value.kch || "",
      name: value.kc_mc || "",
      grade: value.zcj || "",
      makeup: kcxz.includes("补考") ? kcxz : "",
      rebuild: kcxz.includes("重修") ? kcxz : "",
      type: value.kcsx || "",
      credit: value.xf || "",
      gpa: value.jd || "",
      minor: "",
    });
  }
  return grades;
};
