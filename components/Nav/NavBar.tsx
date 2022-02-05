import React, { useState } from "react";
import { NavSelectedTab } from "../../data/types";
import NavBarButton from "./NavBarButton";

export default function NavBar() {
  const [selectedTab, setSelectedTab] = useState<NavSelectedTab>(
    NavSelectedTab.SimpleBuilder
  );

  return (
    <nav className="flex items-center justify-center gap-8 pb-4 text-xl text-white font-ABeeZee">
      <NavBarButton
        text="Simple Builder"
        setSelectedTab={setSelectedTab}
        type={NavSelectedTab.SimpleBuilder}
        selectedTab={selectedTab}
      />
      <NavBarButton
        text="Advanced Builder"
        setSelectedTab={setSelectedTab}
        type={NavSelectedTab.AdvancedBuilder}
        selectedTab={selectedTab}
        disabled
      />
    </nav>
  );
}
