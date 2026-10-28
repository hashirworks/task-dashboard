import { useState, useEffect } from "react";

function useLocalStorage(key, start) {
  const [value, setValue] = useState(() => {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : start;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
