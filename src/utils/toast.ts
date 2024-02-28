import Taro from "@tarojs/taro";

export const Toast = {
  info: (msg: string, time = 2000, icon = "none", mask = false): Promise<string> => {
    Taro.showToast({
      title: msg,
      icon: icon as Required<Parameters<typeof Taro.showToast>>[0]["icon"],
      mask: mask,
      duration: time,
    });
    return new Promise(resolve => setTimeout(() => resolve(msg), time));
  },
  confirm: (title: string, content: string): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      Taro.showModal({
        title,
        content,
        success: choice => {
          if (choice.confirm) resolve(true);
          else resolve(false);
        },
      });
    });
  },
  modal: (title: string, content: string): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      Taro.showModal({
        title,
        content,
        showCancel: false,
        success: () => resolve(true),
      });
    });
  },
};
