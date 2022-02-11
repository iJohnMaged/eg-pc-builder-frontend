import Image from "next/image";
import { Component } from "../../data/types";

type Props = { component: Component };

const ComponentCard = ({ component }: Props) => {
  return (
    <div className="relative flex flex-col mx-auto bg-white shadow-2xl rounded-2xl">
      <div className="absolute z-50 px-4 py-2 text-xs text-white bg-black rounded-full opacity-50 select-none top-3 left-3 hover:opacity-100">
        {component.category.name}
      </div>
      <div className="relative mx-auto overflow-hidden w-60 h-60">
        <Image
          layout="fill"
          objectFit="cover"
          src={component.image}
          alt={component.name}
          quality={100}
          unoptimized={true}
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 m-auto text-center">
        <div className="flex-grow overflow-hidden text-lg font-bold break-all text-zinc-900 w-60 text-ellipsis">
          {component.name}
        </div>
        <div className="text-xl font-bold text-red-500">
          {component.price} EGP
        </div>
      </div>
      <div className="w-full p-3 text-xl font-bold text-center text-white bg-emerald-400 hover:bg-emerald-500 rounded-2xl">
        <a href={component.url} target="_blank" rel="noreferrer">
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ComponentCard;
