import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import NavBar from "../Nav/NavBar";

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
      "xl:text-3xl md:text-base": !shrink,
      "bg-opacity-10 text-sm xl:text-2xl": shrink,
      "py-2": !shrink,
      "py-1": shrink,
      "px-2": true,
    },
    [
      // common
      "fixed w-4/5 top-5 z-50 bg-black text-white flex translate-x-[50%] right-[50%] rounded-3xl",
      // Mobile
      "flex-col items-center justify-center transition-all px-0",
      // md
      "md:flex-row md:justify-between md:px-16",
    ]
  );

  const headerLogoClasses = classNames(
    "flex items-center justify-between font-bold w-full",
    "md:w-auto md:block"
  );

  const hamburgerMenuClasses = classNames(
    "space-y-1 cursor-pointer",
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
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white"></div>
        </div>
      </div>
      <NavBar shrink={shrink} hamburgerMenuOpen={hamburgerMenuOpen} />
    </header>
  );
};

export default Header;
