import React from "react";
import ThemeChanger from "./ThemeChanger";

const Header = () => {
  return (
    <div className="p-2 flex justify-between items-center border-solid border-b-2 hover:border-dotted">
      <h1 className="text-2xl font-bold inline-block pl-10">Fund Me</h1>
      <ThemeChanger />
    </div>
  );
};

export default Header;
