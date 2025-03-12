import React from "react";
import ThemeChanger from "./ThemeChanger";

const Header = () => {
  return (
    <div className="p-2 flex justify-between items-center bg-base-300/80 border-base-300 border-b-8 hover:border-dashed">
      <h1 className="text-2xl font-bold inline-block pl-10 text-primary">Fund Me</h1>
      <ThemeChanger />
    </div>
  );
};

export default Header;
