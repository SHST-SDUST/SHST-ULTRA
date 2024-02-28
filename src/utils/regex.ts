export const RegExec = {
  match: (regex: RegExp, s: string): Array<string> => {
    const result: string[] = [];
    let temp: RegExpExecArray | null = null;
    const flags = `${regex.flags}${regex.global ? "" : "g"}`;
    regex = new RegExp(regex, flags);
    while ((temp = regex.exec(s))) result.push(temp && temp[1] ? temp[1] : temp[0]);
    return result;
  },
  get: (from: string[] | null, index: number) => {
    return from ? from[index] || "" : "";
  },
};
