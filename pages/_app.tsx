import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { IconlyProvider } from "react-iconly";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark",
    theme: {},
  });

  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_CONFIG as string))

  return (
    <NextUIProvider theme={theme}>
      <Head>
        <title>Cesta</title>
        <meta
          property="og:description"
          content="One stop to learn, share and find roadmaps, and resources about anything."
        />
        <meta property="og:url" content="https://cesta-project.vercel.app" />
        <meta property="og:image" content="/favicon.png" />
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
