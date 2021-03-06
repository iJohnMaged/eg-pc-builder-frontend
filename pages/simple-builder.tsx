import { useReducer, useEffect } from "react";
import SimpleBuilder from "../components/SimpleBuilder/SimpleBuilder";
import simpleBuilderReducer, {
  simpleBuilderInitializer,
} from "../components/Reducer/simpleBuilderReducer";
import SimpleBuilderContext from "../components/Context/BuilderContext";
import { SimpleBuilderReducerState } from "../data/types";
import getInitialFields from "../data/initialFields";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const SimpleBuilderPage = () => {
  const initialState: SimpleBuilderReducerState = {
    fields: getInitialFields(),
    selected: {},
  };
  const [state, dispatch] = useReducer(simpleBuilderReducer, initialState, () =>
    simpleBuilderInitializer(initialState)
  );

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA &&
      typeof window !== "undefined"
    ) {
      const builderVersion = localStorage.getItem("builder_version");
      // First time builder is loaded or builder version is different
      if (
        !builderVersion ||
        builderVersion !== process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
      ) {
        localStorage.setItem(
          "builder_version",
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
        );
        localStorage.removeItem("eg_simple_builder");
      }
    }
  }, []);

  return (
    <main className="flex-grow py-4 bg-fixed bg-white bg-cover dark:bg-neutral-900 bg-pattern dark:bg-pattern2">
      <SimpleBuilderContext.Provider
        value={{
          state: state,
          dispatch: dispatch,
        }}
      >
        <SimpleBuilder />
      </SimpleBuilderContext.Provider>
      <ToastContainer position="bottom-left" pauseOnFocusLoss={false} />
    </main>
  );
};

export default SimpleBuilderPage;
