"use client";
import React from "react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemeChanger = () => {
  useEffect(() => {
    themeChange(false);
    // false parameter is required for react project
  }, []);

  return (
    <div>
      <select data-choose-theme className="rounded-md px-2 py-1 border-2 border-base-content">
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeChanger;
