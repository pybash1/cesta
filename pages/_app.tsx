import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { IconlyProvider } from "react-iconly";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark",
    theme: {},
  });

  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_CONFIG as string));

  return (
    <NextUIProvider theme={theme}>
      <DefaultSeo
        title="Cesta"
        description="One stop to learn, share and find roadmaps, and resources about anything."
        canonical="https://cesta-project.vercel.app/"
        openGraph={{
          url: "https://cesta-project.vercel.app",
          title: "Cesta",
          description:
            "One stop to learn, share and find roadmaps, and resources about anything.",
          images: [
            {
              url: "https://cesta-project.vercel.app/banner.png",
              width: 1920,
              height: 1080,
              alt: "Banner",
              type: "image/png",
            },
          ],
          site_name: "Cesta",
        }}
        twitter={{
          handle: "@py_bash1",
          site: "@py_bash1",
          cardType: "summary_large_image"
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: "/logo.png"
          }
        ]}
      />
      {/* @ts-ignore */}
      <IconlyProvider set="two-tone" stroke="bold">
        <Toaster
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <Component {...pageProps} />
      </IconlyProvider>
    </NextUIProvider>
  );
}

export default MyApp;
