import Taro from "@tarojs/taro";

const log = Taro.getRealtimeLogManager ? Taro.getRealtimeLogManager() : null;

export const Report = {
  info: function (...args: (string | Error)[]): void {
    if (!log) return void 0;
    log.info(args);
  },
  warn: function (...args: (string | Error)[]): void {
    if (!log) return void 0;
    log.warn(args);
  },
  error: function (...args: (string | Error)[]): void {
    if (!log) return void 0;
    log.error(args);
  },
  setFilterMsg: function (msg: string): void {
    if (!log || !log.setFilterMsg) return void 0;
    if (typeof msg !== "string") return void 0;
    log.setFilterMsg(msg);
  },
  addFilterMsg: function (msg: string): void {
    if (!log || !log.addFilterMsg) return void 0;
    if (typeof msg !== "string") return void 0;
    log.addFilterMsg(msg);
  },
};
