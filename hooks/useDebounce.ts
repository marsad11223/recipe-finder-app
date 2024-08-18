import { useCallback, useRef } from "react";

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default useDebounce;
