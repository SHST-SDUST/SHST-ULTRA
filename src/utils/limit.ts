/* eslint-disable @typescript-eslint/no-explicit-any */

type LimitFunction = <T extends Array<unknown>>(
  wait: number,
  func: (...args: T) => void,
  ...args: T
) => void;

const debounceGlobalFactory = (): LimitFunction => {
  let timer: NodeJS.Timeout;
  return (wait, func, ...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), wait);
  };
};

const throttleGlobalFactory = (): LimitFunction => {
  let previous = 0;
  return (wait, func, ...args) => {
    const now = +new Date();
    if (now - previous > wait) {
      func(...args);
      previous = now;
    }
  };
};

export const Limit = {
  debounce: <T extends (...args: any) => any>(func: T, wait: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(args), wait);
    };
  },
  throttle: <T extends (...args: any) => any>(func: T, wait: number) => {
    let previous = 0;
    return (...args: Parameters<T>) => {
      const now = +new Date();
      if (now - previous > wait) {
        func(args);
        previous = now;
      }
    };
  },
  throttleGlobalFactory,
  debounceGlobalFactory,
  debounceGlobal: debounceGlobalFactory(),
  throttleGlobal: throttleGlobalFactory(),
};
