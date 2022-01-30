import { useRef } from "react";

const _obj = {};
export function useLazyRef(callbackFn) {
  const ref = useRef(_obj);
  if (ref.current === _obj) {
    ref.current = callbackFn();
  }
  return ref.current;
}

export function customDebounce(callbackFn, delayMs) {
  let index = -1;
  function internalFn({ value }) {
    index = index + 1;
    clearTimeout(internalFn.token);
    const execute = () => {
      const _indexRemainder = index % value.length;
      const _ch = value[_indexRemainder];
      callbackFn({ ch: _ch });
      clearTimeout(internalFn.token);
      internalFn.token = null;
      index = -1;
    };
    internalFn.token = setTimeout(execute, delayMs);
    internalFn.executeNow = execute;
  }
  internalFn.token = null;
  return internalFn;
}
