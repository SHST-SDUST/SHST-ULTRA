import { RegExec } from "@/utils/regex";

import type { UserInfo } from "./model";

export const htmlToUser = (html: string): UserInfo => {
  const div = RegExec.exec(/<div class="HeaderContentDetailtext"[^>]*>([\s\S]*?)<\/div>/, html);
  const academy = RegExec.exec(/院系：(.*?)</, div);
  const name = RegExec.exec(/<input name="kkbs"[^>]*value="([^"]*)"/, html);
  const account = RegExec.exec(/学号：(.*?)</, div);
  return { academy, name, account };
};
