import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import SimpleBuilderSelect from "./SimpleBuilderSelect";
import SimpleBuilderContext from "../Context/BuilderContext";
import ConfirmResetModal from "../Modal/ConfirmResetModal";
import { SimpleBuilderActionType, CreateBuildProgress } from "../../data/types";
import { toast } from "react-toastify";
import SaveButton from "../Buttons/SaveButton";
import BuildUrlWrapper from "./BuildUrlWrapper";

function SimpleBuilder() {
  const { state, dispatch } = useContext(SimpleBuilderContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [createBuildProgress, setCreateBuildProgress] = useState(
    CreateBuildProgress.Ready
  );
  const [buildUrl, setBuildUrl] = useState<string | null>(null);

  useEffect(() => {
    const total = Object.keys(state.selected).reduce((acc, key) => {
      if (state.selected[key] && state.selected[key].price) {
        return acc + parseFloat(state.selected[key].price);
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  }, [state.selected]);

  const saveBuild = async () => {
    if (createBuildProgress !== CreateBuildProgress.Ready) {
      return;
    }

    if (!state.selected || Object.keys(state.selected).length === 0) {
      toast.error("Please select at least one component");
      return;
    }

    setCreateBuildProgress(CreateBuildProgress.Saving);
    const response = await fetch("/api/create-build", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        components: state.selected,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setCreateBuildProgress(CreateBuildProgress.Error);
      setTimeout(() => {
        setCreateBuildProgress(CreateBuildProgress.Ready);
      }, 3000);
      toast.error("Couldn't save your build! 😆");
      return;
    }
    setCreateBuildProgress(CreateBuildProgress.Done);
    setBuildUrl(`${window.location.origin}/build/${data.build.id}`);
  };

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
          <SaveButton
            createBuildProgress={createBuildProgress}
            cb={saveBuild}
          />
        </div>
        <div className="flex flex-col w-full gap-4 px-2 pb-4 md:px-8">
          <BuildUrlWrapper buildUrl={buildUrl} />
          {state.fields.map((field) => (
            <SimpleBuilderSelect
              field={field}
              key={`${field.name}-${field.id}`}
            />
          ))}
          {totalPrice > 0 && (
            <div className="mt-4 text-3xl font-bold text-center text-yellow-400">
              Total Price: {totalPrice} EGP
            </div>
          )}
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
