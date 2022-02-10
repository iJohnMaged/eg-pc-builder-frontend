import Link from "next/link";
import NavBar from "../Nav/NavBar";

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-between px-16 py-2 text-white bg-neutral-900 bg-opacity-20">
      <div className="px-8 py-4 text-3xl font-bold">
        <Link href="/">
          <a>PC Builder</a>
        </Link>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
