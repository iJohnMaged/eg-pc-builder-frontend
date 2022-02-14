import { useState, useEffect } from "react";
import classNames from "classnames";
import { Popover } from "@headlessui/react";

interface IconProps {
  className?: string;
}

const MoonIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 11.807C10.7418 10.5483 9.88488 8.94484 9.53762 7.1993C9.19037 5.45375 9.36832 3.64444 10.049 2C8.10826 2.38205 6.3256 3.33431 4.92899 4.735C1.02399 8.64 1.02399 14.972 4.92899 18.877C8.83499 22.783 15.166 22.782 19.072 18.877C20.4723 17.4805 21.4245 15.6983 21.807 13.758C20.1625 14.4385 18.3533 14.6164 16.6077 14.2692C14.8622 13.9219 13.2588 13.0651 12 11.807V11.807Z" />
    </svg>
  );
};

const SunIcon = ({ className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6.995 12C6.995 14.761 9.241 17.007 12.002 17.007C14.763 17.007 17.009 14.761 17.009 12C17.009 9.239 14.763 6.993 12.002 6.993C9.241 6.993 6.995 9.239 6.995 12ZM11 19H13V22H11V19ZM11 2H13V5H11V2ZM2 11H5V13H2V11ZM19 11H22V13H19V11Z" />
      <path d="M5.63702 19.778L4.22302 18.364L6.34402 16.243L7.75802 17.657L5.63702 19.778Z" />
      <path d="M16.242 6.34405L18.364 4.22205L19.778 5.63605L17.656 7.75805L16.242 6.34405Z" />
      <path d="M6.34402 7.75902L4.22302 5.63702L5.63802 4.22302L7.75802 6.34502L6.34402 7.75902Z" />
      <path d="M19.778 18.3639L18.364 19.7779L16.242 17.6559L17.656 16.2419L19.778 18.3639Z" />
    </svg>
  );
};

const ComputerIcon = ({ className }: IconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 463 463"
      xmlSpace="preserve"
      className={className}
    >
      <g>
        <g>
          <g>
            <path
              d="M431.5,23.999h-400c-17.369,0-31.5,14.13-31.5,31.5v288C0,360.868,14.131,375,31.5,375h135.504l-6.125,49H151.5
				c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h15.994c0.005,0,0.01,0.001,0.016,0.001c0.007,0,0.014-0.001,0.021-0.001
				H295.47c0.007,0,0.014,0.001,0.021,0.001c0.005,0,0.01-0.001,0.016-0.001H311.5c4.142,0,7.5-3.358,7.5-7.5
				c0-4.142-3.358-7.5-7.5-7.5h-9.379l-6.125-49H431.5c17.369,0,31.5-14.131,31.5-31.5v-288C463,38.13,448.869,23.999,431.5,23.999z
				 M175.996,424l6.125-49h98.759l6.124,49H175.996z M448,343.5c0,9.098-7.402,16.5-16.5,16.5h-400c-9.098,0-16.5-7.402-16.5-16.5
				V327h433V343.5z M448,312H15v-256.5c0-9.099,7.402-16.5,16.5-16.5h400c9.098,0,16.5,7.402,16.5,16.5V312z"
            />
            <path
              d="M223.5,351h16c4.142,0,7.5-3.358,7.5-7.5c0-4.142-3.358-7.5-7.5-7.5h-16c-4.142,0-7.5,3.358-7.5,7.5
				C216,347.641,219.358,351,223.5,351z"
            />
            <path
              d="M423.5,55.999h-384c-4.142,0-7.5,3.358-7.5,7.5v224c0,4.142,3.358,7.5,7.5,7.5h384c4.142,0,7.5-3.358,7.5-7.5v-224
				C431,59.357,427.642,55.999,423.5,55.999z M416,280H47v-209h369V280z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
type Props = {
  extraClasses?: string;
};

const ThemeToggle = (props: Props) => {
  const [theme, setTheme] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!("theme" in localStorage)) {
        setTheme("system");
      } else if (localStorage.theme === "dark") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  useEffect(() => {
    if (!theme) {
      return;
    }

    switch (theme) {
      case "system":
        localStorage.removeItem("theme");
        break;
      default:
        localStorage.setItem("theme", theme as string);
        break;
    }
  }, [theme]);

  const toggleTheme = (theme: string) => {
    setTheme(theme);
    switch (theme) {
      case "system":
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      default:
        break;
    }
  };

  return (
    <Popover className={"relative pt-1 ml-4 " + props.extraClasses}>
      <Popover.Button>
        <MoonIcon className="hidden dark:block fill-purple-500" />
        <SunIcon className="block dark:hidden fill-purple-500" />
      </Popover.Button>
      <Popover.Panel>
        <ul className="select-none transition-all absolute left-[50%] -translate-x-[50%] z-50 py-1 mt-5 overflow-hidden text-sm font-bold bg-white rounded-lg shadow-lg top-full ring-1 ring-slate-900/10 w-36 text-slate-700 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300">
          <li
            className={`flex items-center gap-3 px-2 py-2 cursor-pointer bg-slate-50 dark:bg-slate-600/30 hover:bg-slate-200 ${
              theme === "light" ? "text-purple-500" : ""
            }`}
            onClick={() => {
              toggleTheme("light");
            }}
          >
            <SunIcon
              className={`w-5 h-5 ${
                theme === "light"
                  ? "fill-purple-500"
                  : "fill-slate-400 dark:fill-slate-400"
              }`}
            />
            Light
          </li>
          <li
            className={`flex items-center gap-3 px-2 py-2 cursor-pointer bg-slate-50 dark:bg-slate-600/30 hover:bg-slate-200 ${
              theme === "dark" ? "text-purple-500" : ""
            }`}
            onClick={() => {
              toggleTheme("dark");
            }}
          >
            <MoonIcon
              className={`w-5 h-5 ${
                theme === "dark"
                  ? "fill-purple-500"
                  : "fill-slate-400 dark:fill-slate-400"
              }`}
            />
            Dark
          </li>
          <li
            className={`flex items-center gap-3 px-2 py-2 cursor-pointer bg-slate-50 dark:bg-slate-600/30 hover:bg-slate-200 ${
              theme === "system" ? "text-purple-500" : ""
            }`}
            onClick={() => {
              toggleTheme("system");
            }}
          >
            <ComputerIcon
              className={`w-5 h-5 ${
                theme === "system"
                  ? "fill-purple-500"
                  : "fill-slate-400 dark:fill-slate-400"
              }`}
            />
            System
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default ThemeToggle;
