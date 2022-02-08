import { useContext } from "react";
import Select, { createFilter } from "react-select";
import Image from "next/image";
import SimpleBuilderContext from "../Context/BuilderContext";
import CustomOption from "./CustomSelectOption";
import { PcPartField, ActionType } from "../../data/types";

const DefaultPlaceholder = ({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) => (
  <div className="flex items-center gap-x-2">
    <Image src={icon} width={25} height={25} alt={label} className="pr-2" />
    {label}
  </div>
);

interface Props {
  field: PcPartField;
}

export default function SimpleBuilderSelect({ field }: Props) {
  const value = useContext(SimpleBuilderContext);
  const uniqueId = `${field.name}-${field.id}`;

  const customStyles = {
    menu: (provided: any) => ({
      ...provided,
      background: "#1A1A1A",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? "2px solid black" : "2px solid #e1e1e1",
      outline: "none",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused ? "2px solid black" : "2px solid #e1e1e1",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: "#1A1A1A",
      color: "white",
      padding: "10px 10px",
      "&:hover": {
        background: "#404040",
        color: "white",
      },
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };
  return (
    <div className="flex flex-col gap-y-2">
      <label
        className="text-base font-semibold text-neutral-800"
        htmlFor={uniqueId}
      >
        {field.name}{" "}
        {value.state && value.state.selected[uniqueId] && (
          <span className="italic text-purple-600 font-bolder">
            ({value.state.selected[uniqueId].price} EGP)
          </span>
        )}
      </label>
      <div className="flex gap-x-4">
        <Select
          filterOption={createFilter({ ignoreAccents: false })}
          inputId={uniqueId}
          instanceId={uniqueId}
          options={value.state && value.state.options.data[field.dataField]}
          styles={customStyles}
          getOptionLabel={(option) => `${option.name} - ${option.price} EGP`}
          getOptionValue={(option) => `${option.id}`}
          placeholder={
            <DefaultPlaceholder
              label={"Select " + field.name}
              icon={field.icon}
            />
          }
          onChange={(option, meta) => {
            if (!value.dispatch) {
              return;
            }
            if (meta.action === "select-option") {
              value.dispatch({
                type: ActionType.ADD_COMPONENT,
                payload: {
                  field,
                  data: option,
                },
              });
            } else if (meta.action === "clear") {
              value.dispatch({
                type: ActionType.REMOVE_COMPONENT,
                payload: {
                  field,
                },
              });
            }
          }}
          components={{ Option: CustomOption }}
          menuPlacement="auto"
          className="w-[550px] text-sm font-bold"
          isClearable
        />
        {field.canAdd && (
          <Image
            src={"/icons/plus.svg"}
            width={25}
            height={25}
            alt={"cpu"}
            className="cursor-pointer"
            onClick={() => {
              if (!value.dispatch) {
                return;
              }
              value.dispatch({
                type: ActionType.ADD_PART_FIELD,
                payload: {
                  field,
                },
              });
            }}
          />
        )}
      </div>
      {value.state && value.state.selected[uniqueId] && (
        <div className="text-xs italic max-w-[450px] text-ellipsis overflow-hidden whitespace-nowrap">
          <a
            href={value.state.selected[uniqueId].url}
            target="_blank"
            rel="noreferrer"
            className="text-purple-500"
          >
            {value.state.selected[uniqueId].url}
          </a>
        </div>
      )}
    </div>
  );
}
