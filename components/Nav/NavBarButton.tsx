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
    "px-4 py-2 cursor-pointer": true,
    // Hover
    "relative hover:after:absolute hover:after:w-full hover:after:h-1 hover:after:bg-white hover:after:-bottom-1 hover:after:left-0 after:rounded-full":
      true,
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-40": true,
    // animations
    "transition-all duration-200 ease-in-out after:transition-all": true,
    // Active tab
    "font-bold after:absolute after:w-full after:h-1 after:bg-white after:-bottom-1 after:left-0":
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
