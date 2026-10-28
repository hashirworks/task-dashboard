import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>Theme: {theme}</button>;
}

export default ThemeToggle;
