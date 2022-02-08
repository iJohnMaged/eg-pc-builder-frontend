import { useReducer, useEffect } from "react";
import { GetServerSideProps } from "next";

import SimpleBuilder from "../components/SimpleBuilder/SimpleBuilder";
import simpleBuilderReducer, {
  simpleBuilderInitializer,
} from "../components/Reducer/simpleBuilderReducer";
import SimpleBuilderContext from "../components/Context/BuilderContext";
import FIELDS from "../data/initialFields";
import { CategoriesComponents, SimpleBuilderReducerState } from "../data/types";

const SimpleBuilderPage = (props: CategoriesComponents) => {
  const initialState: SimpleBuilderReducerState = {
    fields: FIELDS,
    selected: {},
  };
  const [state, dispatch] = useReducer(simpleBuilderReducer, initialState, () =>
    simpleBuilderInitializer(initialState, props.data)
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
    <main className="flex-grow py-4 bg-fixed bg-opacity-50 bg-center bg-repeat bg-checkboardPattern bg-clip-border bg-origin-padding bg-20px">
      <SimpleBuilderContext.Provider
        value={{
          state: state,
          dispatch: dispatch,
          options: { data: props.data },
        }}
      >
        <SimpleBuilder />
      </SimpleBuilderContext.Provider>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const res = await fetch(baseUrl + "/api/pc-parts");
  const data = await res.json();

  return {
    props: {
      data: data.parts,
    },
  };
};

export default SimpleBuilderPage;
