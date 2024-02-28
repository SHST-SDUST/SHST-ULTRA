import { useEffect, useRef } from "react";

import { App } from "@/utils/app";

export const useOnLoadEffect = (fn: () => void) => {
  const func = useRef(fn);
  func.current = fn;

  useEffect(() => {
    App.onload(func.current);
  }, []);
};
