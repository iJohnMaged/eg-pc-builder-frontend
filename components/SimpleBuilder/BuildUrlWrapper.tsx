import React from "react";

type Props = {
  buildUrl: string | null;
};

const CopyIcon = () => (
  <svg
    className="w-6 h-6 stroke-stone-700"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 38H41V16L30 4H13V38Z"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 4V16H41"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 20V44H28"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19 20H23" strokeWidth="4" strokeLinecap="round" />
    <path d="M19 28H31" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BuildUrlWrapper = (props: Props) => {
  if (props.buildUrl == null) {
    return null;
  }
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-2 mx-auto text-sm font-bold text-center border rounded-lg w-max border-emerald-400 text-neutral-900">
      <a href={props.buildUrl}>{props.buildUrl}</a>
      <button
        className="p-1 text-white rounded-full bg-neutral-200 hover:bg-neutral-300"
        onClick={() => {
          navigator.clipboard.writeText(props.buildUrl as string);
        }}
      >
        <CopyIcon />
      </button>
    </div>
  );
};

export default BuildUrlWrapper;
