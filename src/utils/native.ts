import type { ITouchEvent } from "@tarojs/components";

export const stopBubble = (e: React.SyntheticEvent | ITouchEvent) => {
  e.stopPropagation();
};

/**
 * Go-Style 异步异常处理
 * @param { Promise } promise
 * @return { Promise }
 */
export const to = <T, U extends Error>(
  promise: Promise<T>
): Promise<[null, T] | [U, undefined]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((error: U) => {
      if (error instanceof Error === false) {
        return [new Error(String(error)) as U, undefined];
      }
      return [error, undefined];
    });
};
