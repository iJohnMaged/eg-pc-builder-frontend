import { useContext } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";

export default function SimpleBuilder() {
  const value = useContext(SimpleBuilderContext);

  return (
    <div className="flex flex-col items-start w-max mx-auto gap-4 text-xl text-neutral-700 border-4 rounded-lg shadow-hardShadow bg-white border-neutral-900">
      <div className="text-black border-b-4 border-black w-full px-8 py-4 font-extrabold flex gap-4">
        <div>Builder...</div>
        <div className="w-full flex flex-col justify-between">
          <div className="h-[4px] w-full bg-black rounded-full"></div>
          <div className="h-[4px] w-full bg-black rounded-full"></div>
          <div className="h-[4px] w-full bg-black rounded-full"></div>
        </div>
      </div>
      <div className="px-8 pb-4 flex flex-col gap-4">
        {value.state &&
          value.state.fields.map((field) => (
            <SimpleBuilderSelect
              field={field}
              key={`${field.name}-${field.id}`}
            />
          ))}
        {value.state && Object.keys(value.state.selected).length > 0 && (
          <div className="text-center font-bold text-3xl text-purple-600 mt-4">
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
