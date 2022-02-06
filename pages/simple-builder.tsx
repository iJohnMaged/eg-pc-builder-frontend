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
    <main className="py-4 bg-repeat bg-center bg-checkboardPattern bg-clip-border bg-origin-padding bg-fixed bg-20px bg-opacity-50 flex-grow">
      <SimpleBuilderContext.Provider
        value={{ state: state, dispatch: dispatch }}
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
