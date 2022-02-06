import { useReducer } from "react";
import { GetServerSideProps } from "next";

import SimpleBuilder from "../components/SimpleBuilder/SimpleBuilder";
import reducer from "../components/Reducer/reducer";
import SimpleBuilderContext from "../components/Context/BuilderContext";
import FIELDS from "../data/initialFields";
import { PartsData, SimpleBuilderReducerState } from "../data/types";

const SimpleBuilderPage = (props: PartsData) => {
  const initialState: SimpleBuilderReducerState = {
    fields: FIELDS,
    selected: {},
    options: {
      data: props.data,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="py-4 bg-repeat bg-center bg-checkboardPattern bg-clip-border bg-origin-padding bg-scroll bg-20px bg-opacity-50 flex-grow">
      <SimpleBuilderContext.Provider
        value={{ state: state, dispatch: dispatch }}
      >
        <SimpleBuilder />
        {Object.keys(state.selected).length > 0 && (
          <div className="text-center font-bold text-3xl text-emerald-400 mt-4">
            <span>Total: </span>
            {Object.keys(state.selected).reduce((acc, key) => {
              if (state.selected[key] && state.selected[key].price) {
                return acc + state.selected[key].price;
              }
              return acc;
            }, 0)}{" "}
            EGP
          </div>
        )}
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
