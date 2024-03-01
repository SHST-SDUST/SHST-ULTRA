import { RegExec as R } from "../src/utils/regex";

const html = ``;

const text = html.replace(/&nbsp;/g, "");
const data = R.match(/<td[\s\S]*?>([\s\S]*?)<\/td>/, text);
const user: Record<string, string> = {
  academy: "院系",
  name: "姓名",
  account: "学号",
};
const revert: Record<string, string> = {};
Object.keys(user).forEach(key => {
  revert[user[key]] = key;
  user[key] = "";
});
for (let i = 0; i < data.length; i++) {
  const key = data[i];
  if (revert[key] && !user[revert[key]]) {
    const value = data[i + 1] || "";
    if (!value.startsWith("<")) {
      user[revert[key]] = data[i + 1] || "";
    }
    ++i;
  }
}
console.log("user :>> ", user);
