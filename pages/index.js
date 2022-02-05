import { useReducer } from "react";
import Head from "next/head";
import NavBar from "../components/Nav/NavBar";
import Builder from "../components/SimpleBuilder/Builder";
import reducer from "../components/Reducer/reducer";
import BuilderContext from "../components/Context/BuilderContext";
import FIELDS from "../data/initialFields";

export default function Home({ data }) {
  const [state, dispatch] = useReducer(reducer, {
    selected: {},
    fields: FIELDS,
    options: data,
  });

  return (
    <BuilderContext.Provider value={{ state: state, dispatch: dispatch }}>
      <Head>
        <title>EG PC Builder</title>
      </Head>
      <div className="scroll-smooth font-Quicksand">
        <header className="text-white bg-neutral-800">
          <div className="px-8 py-4 text-3xl font-bold">EG PC Builder</div>
          <NavBar />
        </header>
        <main className="mt-8">
          <Builder />
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
    </BuilderContext.Provider>
  );
}

export async function getServerSideProps({ req }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const res = await fetch(baseUrl + "/api/pc-parts");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
