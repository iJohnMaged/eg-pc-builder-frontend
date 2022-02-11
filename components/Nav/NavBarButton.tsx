import { NavSelectedTab } from "../../data/types";
import classNames from "classnames";
import { useRouter } from "next/router";

interface Props {
  text: string;
  type: NavSelectedTab;
  setSelectedTab: (tab: NavSelectedTab) => void;
  selectedTab: NavSelectedTab;
  disabled?: boolean;
}

const TabToLink: {
  [key: string]: string;
} = {
  [NavSelectedTab.Home]: "/",
  [NavSelectedTab.SimpleBuilder]: "/simple-builder",
  [NavSelectedTab.About]: "/about",
  [NavSelectedTab.None]: "/",
};

const NavBarButton = ({
  text,
  setSelectedTab,
  type,
  selectedTab,
  disabled,
}: Props) => {
  const router = useRouter();

  const classes = classNames({
    // Basic classes, not selected
    "after:w-0 after:mx-auto after:inset-x-0": selectedTab !== type,
    "px-4 py-2 cursor-pointer": true,
    // Hover
    "relative hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-white hover:after:bottom-0 hover:after:left-0 after:rounded-full":
      true,
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-40": true,
    // animations
    "transition-all duration-200 ease-in-out after:transition-all": true,
    // Active tab
    "font-bold after:absolute after:w-[5%] after:mx-auto after:inset-x-0 after:h-0.5 after:bg-white after:bottom-0":
      selectedTab === type,
  });

  return (
    <button
      className={`${classes}`}
      disabled={disabled}
      onClick={() => {
        setSelectedTab(type);
        router.push(`${TabToLink[type]}`, undefined, { shallow: true });
      }}
    >
      {text}
    </button>
  );
};

export default NavBarButton;
