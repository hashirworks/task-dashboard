import React from "react";
import ThemeToggle from "./ThemeToggle";

function Header(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <ThemeToggle />
    </div>
  );
}

export default Header;
