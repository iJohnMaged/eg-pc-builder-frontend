import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";
import ConfirmResetModal from "../Modal/ConfirmResetModal";
import { SimpleBuilderActionType } from "../../data/types";

function SimpleBuilder() {
  const { state, dispatch } = useContext(SimpleBuilderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

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
    <>
      <div className="flex flex-col items-start w-4/5 max-w-3xl mx-auto mt-20 text-xl bg-white border-4 border-black rounded-lg gap-y-4">
        <div className="flex items-center justify-between w-full gap-4 px-8 py-4 font-extrabold text-black border-b-4 border-black">
          <div>Builder...</div>
          <div className="flex flex-col justify-between w-full gap-1">
            <div className="h-[4px] w-full bg-black rounded-full"></div>
            <div className="h-[4px] w-full bg-black rounded-full"></div>
            <div className="h-[4px] w-full bg-black rounded-full"></div>
          </div>
          <button
            className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => setShowResetConfirmation(true)}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col w-full gap-4 px-2 pb-4 md:px-8">
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
      <ConfirmResetModal
        show={showResetConfirmation}
        cbAccept={() => {
          setShowResetConfirmation(false);
          dispatch({
            type: SimpleBuilderActionType.RESET_SELECTED,
          });
        }}
        cbCancel={() => {
          setShowResetConfirmation(false);
        }}
      />
    </>
  );
}

export default dynamic(() => Promise.resolve(SimpleBuilder), {
  ssr: false,
});
