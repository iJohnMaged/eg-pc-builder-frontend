import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import NavBar from "../Nav/NavBar";

const Header = () => {
  const [shrink, setShrink] = useState<boolean>(false);
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

  const classes = classNames({
    "text-3xl": !shrink,
    "text-xl": shrink,
    "py-2": !shrink,
    "py-0": shrink,
  });
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-16 text-white bg-black transition-all ${classes}`}
    >
      <div className="px-8 font-bold">
        <Link href="/">
          <a>PC Builder</a>
        </Link>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
