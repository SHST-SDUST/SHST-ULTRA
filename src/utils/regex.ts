export const RegExec = {
  exec: (regex: RegExp, s: string, index = 1): string => {
    const res = regex.exec(s);
    if (!res) return "";
    return res[index] !== void 0 ? res[index] : res[0];
  },
  match: (regex: RegExp, s: string): Array<string> => {
    const result: string[] = [];
    let temp: RegExpExecArray | null = null;
    const flags = `${regex.flags}${regex.global ? "" : "g"}`;
    regex = new RegExp(regex, flags);
    while ((temp = regex.exec(s))) {
      const item = temp && temp[1] !== void 0 ? temp[1] : temp[0];
      result.push(item || "");
    }
    return result;
  },
  get: (from: string[] | null, index: number) => {
    return from ? from[index] || "" : "";
  },
};
