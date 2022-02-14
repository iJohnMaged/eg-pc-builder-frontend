import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import NavBar from "../Nav/NavBar";
import ThemeToggle from "../Buttons/ThemeToggle";
const Header = () => {
  const [shrink, setShrink] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      setShrink((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const headerWrapperClasses = classNames(
    {
      "xl:text-3xl md:text-base md:top-3 md:py-2 py-4 md:rounded-md lg:rounded-lg":
        !shrink,
      "text-sm xl:text-2xl top-0 py-4 md:py-1 border-t-0 md:rounded-b-md lg:rounded-b-lg":
        shrink,
    },
    [
      // common
      "fixed z-50 bg-black text-white flex translate-x-[50%] right-[50%] z-[100] duration-75 transition-all ease-in-out px-16",
      // Mobile
      "flex-col items-center justify-center w-full top-0",
      // md
      "md:flex-row md:px-16 md:w-4/5",
    ]
  );

  const headerLogoClasses = classNames(
    "flex items-center font-bold w-full md:mr-auto",
    "md:w-auto md:block"
  );

  const hamburgerMenuClasses = classNames(
    "space-y-1 cursor-pointer ml-auto",
    "md:hidden"
  );
  return (
    <header className={headerWrapperClasses}>
      <div className={headerLogoClasses}>
        <Link href="/">
          <a>PC Builder</a>
        </Link>
        <div
          className={hamburgerMenuClasses}
          onClick={() => setHamburgerMenuOpen(!hamburgerMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-slate-100"></div>
          <div className="w-6 h-0.5 bg-slate-100"></div>
          <div className="w-6 h-0.5 bg-slate-100"></div>
        </div>
        <ThemeToggle extraClasses="md:hidden" />
      </div>
      <NavBar shrink={shrink} hamburgerMenuOpen={hamburgerMenuOpen} />
      <ThemeToggle extraClasses="md:block hidden mt-1" />
    </header>
  );
};

export default Header;
