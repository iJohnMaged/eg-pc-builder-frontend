import { useContext } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";

export default function SimpleBuilder() {
  const value = useContext(SimpleBuilderContext);

  return (
    <div className="flex flex-col items-start gap-4 mx-auto text-xl bg-white border-4 rounded-lg w-max text-neutral-700 shadow-hardShadow border-neutral-900">
      <div className="flex w-full gap-4 px-8 py-4 font-extrabold text-black border-b-4 border-black">
        <div>Builder...</div>
        <div className="flex flex-col justify-between w-full">
          <div className="h-[4px] w-full bg-black rounded-full"></div>
          <div className="h-[4px] w-full bg-black rounded-full"></div>
          <div className="h-[4px] w-full bg-black rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-8 pb-4">
        {value.state &&
          value.state.fields.map((field) => (
            <SimpleBuilderSelect
              field={field}
              key={`${field.name}-${field.id}`}
            />
          ))}
        {value.state && Object.keys(value.state.selected).length > 0 && (
          <div className="mt-4 text-3xl font-bold text-center text-purple-600">
            <span>Total: </span>
            {Object.keys(value.state.selected).reduce((acc, key) => {
              if (!value.state) return acc;
              if (
                value.state.selected[key] &&
                value.state.selected[key].price
              ) {
                return acc + value.state.selected[key].price;
              }
              return acc;
            }, 0)}{" "}
            EGP
          </div>
        )}
      </div>
    </div>
  );
}
