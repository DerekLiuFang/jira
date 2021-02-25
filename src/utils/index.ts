import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !value);

export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay = 100) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <A>(initArray: A[]) => {
  const [value, setValue] = useState(initArray);

  return {
    value,
    setValue,
    add: (addItem: A) => setValue([...value, addItem]),
    removeIndex: (index: number) => {
      const cloneArray = [...value];
      cloneArray.splice(index, 1);
      setValue(cloneArray);
    },
    clear: () => setValue([]),
  };
};
