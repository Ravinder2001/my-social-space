import { useEffect, useState } from 'react';

export function useDebounce(callback: Function, delay: number, deps: any[]) {
  const [debouncedValue, setDebouncedValue] = useState<any>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(callback());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, ...deps]);

  return debouncedValue;
}
