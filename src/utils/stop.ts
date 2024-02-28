import type { ITouchEvent } from "@tarojs/components";

export const stopBubble = (e: React.SyntheticEvent | ITouchEvent) => {
  e.stopPropagation();
};
