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
  const [buildUrl, setBuildUrl] = useState<string | null>(
    "http://localhost:3000/build/175981e3-71e4-4950-9b83-0602df42a2cc"
  );

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
      <div className="flex flex-col items-start w-4/5 max-w-3xl mx-auto mt-20 text-xl text-black bg-white border border-neutral-700 rounded-lg dark:text-white dark:border-white/20 dark:bg-[#242526] gap-y-4">
        <div className="flex flex-col items-center justify-between w-full gap-4 px-4 py-4 font-extrabold border-b md:flex-row border-neutral-700 dark:border-white/20">
          <button
            className="relative flex items-center justify-center flex-shrink-0 w-full gap-3 px-16 py-2 text-sm font-bold text-white transition-all transform bg-red-500 border-none rounded shadow-xl outline-none focus:ring-4 focus:ring-red-300 hover:bg-red-600 md:w-max"
            onClick={() => setShowResetConfirmation(true)}
          >
            Reset
          </button>
          <SaveButton
            createBuildProgress={createBuildProgress}
            cb={saveBuild}
          />
        </div>
        <div className="flex flex-col w-full gap-4 px-4 pb-4 md:px-8">
          <BuildUrlWrapper buildUrl={buildUrl} />
          {state.fields.map((field) => (
            <SimpleBuilderSelect
              field={field}
              key={`${field.name}-${field.id}`}
            />
          ))}
          {totalPrice > 0 && (
            <div className="mt-4 text-3xl font-bold text-center text-purple-400">
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
