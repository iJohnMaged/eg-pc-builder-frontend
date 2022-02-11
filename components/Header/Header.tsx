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
      "text-3xl": !shrink,
      "text-xl bg-opacity-10": shrink,
      "py-2": !shrink,
      "py-1": shrink,
    },
    [
      // common
      "fixed inset-x-0 top-0 z-50 bg-black text-white flex",
      // Mobile
      "flex-col items-center justify-center transition-all px-0",
      // md
      "md:flex-row md:justify-between md:px-16",
    ]
  );

  const headerLogoClasses = classNames(
    "flex items-center justify-between px-8 font-bold w-full",
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
