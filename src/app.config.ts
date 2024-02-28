import { PATH } from "./utils/constant";

export default defineAppConfig({
  pages: [...Object.values(PATH).map(path => path.slice(1))],
  window: {
    // @ts-expect-error color var
    navigationBarTextStyle: "@navigationBarTextStyle",
    navigationBarTitleText: "山科小站",
    navigationBarBackgroundColor: "@navigationBarBackgroundColor",
    backgroundColor: "@backgroundColor",
  },
  // tabBar: {
  //   color: "@tabBarColor",
  //   selectedColor: "@tabBarSelectedColor",
  //   backgroundColor: "@backgroundColor",
  //   list: [
  //     {
  //       iconPath: "./static/index.png",
  //       selectedIconPath: "./static/index-active.png",
  //       pagePath: PATH.HOME.slice(1),
  //       text: "首页",
  //     },
  //     {
  //       iconPath: "./static/func.png",
  //       selectedIconPath: "./static/func-active.png",
  //       pagePath: PATH.PLUS.slice(1),
  //       text: "功能",
  //     },
  //     {
  //       iconPath: "./static/user.png",
  //       selectedIconPath: "./static/user-active.png",
  //       pagePath: PATH.USER.slice(1),
  //       text: "用户",
  //     },
  //   ],
  // },
  darkmode: true,
  themeLocation: "config/theme.json",
  permission: {
    "scope.userLocation": {
      desc: "您的位置信息将用于嵙地图定位功能",
    },
  },
});
