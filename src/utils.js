import { useRef } from "react";

const _obj = {};
export function useLazyRef(callbackFn) {
  const ref = useRef(_obj);
  if (ref.current === _obj) {
    ref.current = callbackFn();
  }
  return ref.current;
}
