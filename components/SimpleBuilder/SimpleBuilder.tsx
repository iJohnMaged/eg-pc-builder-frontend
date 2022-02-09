import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";

function SimpleBuilder() {
  const { state } = useContext(SimpleBuilderContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = Object.keys(state.selected).reduce((acc, key) => {
      if (state.selected[key] && state.selected[key].price) {
        return acc + state.selected[key].price;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  }, [state.selected]);

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
        {state.fields.map((field) => (
          <SimpleBuilderSelect
            field={field}
            key={`${field.name}-${field.id}`}
          />
        ))}
        <div className="mt-4 text-3xl font-bold text-center text-purple-600">
          Total Price: {totalPrice} EGP
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(SimpleBuilder), {
  ssr: false,
});
