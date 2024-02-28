import { useLayoutEffect, useRef } from "react";

import { App } from "@/utils/app";

export const useOnLoadLayoutEffect = (fn: () => void) => {
  const func = useRef(fn);
  func.current = fn;

  useLayoutEffect(() => {
    App.onload(func.current);
  }, []);
};
