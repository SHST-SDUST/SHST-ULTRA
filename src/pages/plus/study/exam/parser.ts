import type { ExamType } from "./model";

export const htmlToExams = (text: string): ExamType[] => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  if (!json) {
    return [];
  }
  const exams: ExamType[] = [];
  for (const value of json.data) {
    exams.push({
      no: value.kch || "",
      name: value.kskcmc || "",
      classroom: value.js_mc || "",
      location: value.zwh || "",
      time: value.kssj || "",
    });
  }
  return exams;
};
