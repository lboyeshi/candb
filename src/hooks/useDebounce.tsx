import * as React from "react";
import { useState, useEffect } from "react";

const useDebounce = (value: any, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
