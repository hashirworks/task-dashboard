import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
