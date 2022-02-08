import React from "react";
import { components, OptionProps } from "react-select";
import Image from "next/image";
import { Component } from "../../data/types";

interface Props {
  children: React.ReactNode;
  innerProps: any;
  data: Component;
}
export default function CustomOption({ children, ...props }: Props) {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...(props as OptionProps), innerProps: rest };
  return (
    <components.Option {...newProps}>
      <div className="flex items-center gap-x-2">
        <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg">
          {props.data.imageUrl && (
            <Image
              src={props.data.imageUrl}
              width={48}
              height={48}
              alt={props.data.name}
              unoptimized={true}
            />
          )}
        </div>
        <div className="break-all">
          {props.data.name} - {props.data.price} EGP
        </div>
      </div>
    </components.Option>
  );
}
