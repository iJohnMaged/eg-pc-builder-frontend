import React, { useState } from "react";
const classNames = require("classnames");

export default function NavBar() {
  const [selectedTab, setSelectedTab] = useState("menu1");
  const classes = classNames({
    // Basic classes, not selected
    "px-4 py-2 cursor-pointer text-white": true,
    // Hover
    "relative hover:after:absolute hover:after:w-full hover:after:h-1 hover:after:bg-white hover:after:bottom-0 hover:after:left-0": true,
  });
  const getActiveClasses = (tab) => {
    if (tab === selectedTab) {
      return "font-bold text-white after:absolute after:w-full after:h-1 after:bg-white after:bottom-0 after:left-0";
    }
  };

  return (
    <nav className="flex items-center justify-center gap-8 pb-4 text-xl text-white font-ABeeZee">
      <div
        className={`${classes} ${getActiveClasses("menu1")}`}
        onClick={() => setSelectedTab("menu1")}
      >
        Menu Item 1
      </div>
      <div
        className={`${classes} ${getActiveClasses("menu2")}`}
        onClick={() => setSelectedTab("menu2")}
      >
        Menu Item 2
      </div>
    </nav>
  );
}
