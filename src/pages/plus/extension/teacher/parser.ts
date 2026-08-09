import type { CourseTableItem } from "@/components/course-table/types";

export const htmlToCourses = (text: string): Record<string, CourseTableItem[]> => {
  const json = typeof text === "string" ? JSON.parse(text) : text;
  return json;
};
