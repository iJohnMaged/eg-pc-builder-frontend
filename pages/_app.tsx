import "../styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import Header from "../components/Header/Header";

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
        <title>PC Builder</title>
      </Head>
      <div className="flex flex-col min-h-screen scroll-smooth font-Quicksand">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
