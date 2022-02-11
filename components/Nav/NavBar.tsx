import React, { useState, useEffect } from "react";
import { NavSelectedTab } from "../../data/types";
import NavBarButton from "./NavBarButton";
import { useRouter } from "next/router";
import classNames from "classnames";

const PathToTab: {
  [key: string]: NavSelectedTab;
} = {
  "/": NavSelectedTab.Home,
  "/simple-builder": NavSelectedTab.SimpleBuilder,
  "/about": NavSelectedTab.About,
};

interface NavBarProps {
  shrink: boolean;
  hamburgerMenuOpen: boolean;
}

export default function NavBar(props: NavBarProps) {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<NavSelectedTab>(
    PathToTab[router.pathname]
  );

  useEffect(() => {
    setSelectedTab(PathToTab[router.pathname]);
  }, [router.pathname]);

  const classes = classNames(
    {
      "text-sm lg:text-lg": !props.shrink,
      "text-sm lg:text-base": props.shrink,
      hidden: !props.hamburgerMenuOpen,
      flex: props.hamburgerMenuOpen,
    },
    "transition-all md:flex",
    "flex-col items-center",
    "md:flex-row"
  );

  return (
    <nav className={classes}>
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
      />
    </nav>
  );
}
