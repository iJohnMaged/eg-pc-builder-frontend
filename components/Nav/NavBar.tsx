import React, { useState, useEffect } from "react";
import { NavSelectedTab } from "../../data/types";
import NavBarButton from "./NavBarButton";
import { useRouter } from "next/router";

const PathToTab: {
  [key: string]: NavSelectedTab;
} = {
  "/": NavSelectedTab.Home,
  "/simple-builder": NavSelectedTab.SimpleBuilder,
  "/about": NavSelectedTab.About,
};

export default function NavBar() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<NavSelectedTab>(
    PathToTab[router.pathname]
  );

  useEffect(() => {
    setSelectedTab(PathToTab[router.pathname]);
  }, [router.pathname]);

  return (
    <nav className="flex items-center justify-center gap-8 pb-4 text-xl font-ABeeZee">
      <NavBarButton
        text="Home"
        setSelectedTab={setSelectedTab}
        type={NavSelectedTab.Home}
        selectedTab={selectedTab}
      />
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
      <NavBarButton
        text="About"
        setSelectedTab={setSelectedTab}
        type={NavSelectedTab.About}
        selectedTab={selectedTab}
        disabled
      />
    </nav>
  );
}
