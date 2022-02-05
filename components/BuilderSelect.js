import { useContext } from "react";
import Select, { components, createFilter } from "react-select";
import Image from "next/image";
import BuilderContext from "./BuilderContext";
import CustomOption from "./CustomSelectOption";

const DefaultPlaceholder = ({ label, type }) => (
  <div className="flex items-center gap-x-2">
    <Image
      src={`/icons/${type}.svg`}
      width={25}
      height={25}
      alt={"cpu"}
      className="pr-2"
    />
    {label}
  </div>
);

export default function BuilderSelect({ label, isClearable }) {
  const value = useContext(BuilderContext);
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      background: "#1A1A1A",
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "2px solid black" : "2px solid #e1e1e1",
      outline: "none",
      boxShadow: "none",
      "&:hover": {
        border: state.isFocused ? "2px solid black" : "2px solid #e1e1e1",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      background: "#1A1A1A",
      color: "white",
      padding: "10px 10px",
      "&:hover": {
        background: "#404040",
        color: "white",
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
  };
  return (
    <div className="flex flex-col gap-y-2">
      <label
        className="text-base font-semibold text-neutral-800"
        htmlFor={label}
      >
        {label}{" "}
        {value.state.selected[label.toLowerCase()] && (
          <span className="font-bolder italic text-emerald-500">
            ({value.state.selected[label.toLowerCase()].price} EGP)
          </span>
        )}
      </label>
      <div className="flex gap-x-4">
        <Select
          filterOption={createFilter({ ignoreAccents: false })}
          inputId={label}
          options={value.state.options.data[label.toLowerCase()]}
          styles={customStyles}
          getOptionLabel={(option) => `${option.name} - ${option.price} EGP`}
          getOptionValue={(option) => option.id}
          placeholder={
            <DefaultPlaceholder
              label={"Select a " + label}
              type={label.toLowerCase()}
            />
          }
          onChange={(option, meta) => {
            if (meta.action === "select-option") {
              value.dispatch({
                type: "ADD_COMPONENT",
                payload: {
                  type: label.toLowerCase(),
                  data: option,
                },
              });
            } else if (meta.action === "clear") {
              value.dispatch({
                type: "REMOVE_COMPONENT",
                payload: {
                  type: label.toLowerCase(),
                },
              });
            }
          }}
          components={{ Option: CustomOption }}
          menuPlacement="auto"
          className="w-[550px] text-sm font-bold"
          isClearable={isClearable ? isClearable : false}
        />
        <Image
          src={"/icons/plus.svg"}
          width={25}
          height={25}
          alt={"cpu"}
          className="cursor-pointer"
          onClick={() => {
            value.dispatch({
              type: "ADD_FIELD",
              payload: {
                type: label,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
