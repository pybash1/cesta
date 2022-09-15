import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { IconlyProvider } from "react-iconly";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark",
    theme: {},
  });

  return (
    <NextUIProvider theme={theme}>
      <Head>
        <title>Cesta</title>
      </Head>
      {/* @ts-ignore */}
      <IconlyProvider set='two-tone' stroke='bold' >
        <Toaster toastOptions={{
          style: {
            background: "#333",
            color: "#fff"
          }
        }} />
        <Component {...pageProps} />
      </IconlyProvider>
    </NextUIProvider>
  );
}

export default MyApp;
