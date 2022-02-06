import { useReducer } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NavBar from "../components/Nav/NavBar";
import SimpleBuilder from "../components/SimpleBuilder/SimpleBuilder";
import reducer from "../components/Reducer/reducer";
import SimpleBuilderContext from "../components/Context/BuilderContext";
import FIELDS from "../data/initialFields";
import { PartsData, SimpleBuilderReducerState } from "../data/types";

export default function Home(props: PartsData) {
  const initialState: SimpleBuilderReducerState = {
    fields: FIELDS,
    selected: {},
    options: {
      data: props.data,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SimpleBuilderContext.Provider value={{ state: state, dispatch: dispatch }}>
      <Head>
        <title>EG PC Builder</title>
      </Head>
      <div className="scroll-smooth font-Quicksand">
        <header className="text-white bg-neutral-800">
          <div className="px-8 py-4 text-3xl font-bold">EG PC Builder</div>
          <NavBar />
        </header>
        <main className="py-8">
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
        </main>
      </div>
    </SimpleBuilderContext.Provider>
  );
}
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
