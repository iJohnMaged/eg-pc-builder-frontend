import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/Nav/NavBar";
import Router from "next/router";
import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <Head>
        <title>EG PC Builder</title>
      </Head>
      <div className="scroll-smooth font-Quicksand">
        <header className="text-white bg-neutral-800">
          <div className="px-8 py-4 text-3xl font-bold">EG PC Builder</div>
          <NavBar />
        </header>
        <main className="py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default MyApp;
