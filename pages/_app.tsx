import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  NextUIProvider,
  createTheme,
  Modal,
  Text,
  Input,
  Spacer,
  Button,
} from "@nextui-org/react";
import { IconlyProvider } from "react-iconly";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { DefaultSeo } from "next-seo";
import { useState, useEffect } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { Resource, Roadmap } from "../models";

function MyApp({ Component, pageProps }: AppProps) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [resultsRoadmap, setResultsRoadmap] = useState<Roadmap[]>([]);
  const [resultsResource, setResultsResource] = useState<Resource[]>([]);

  Amplify.configure(JSON.parse(process.env.NEXT_PUBLIC_AWS_CONFIG as string));

  useEffect(() => {
    DataStore.query(Roadmap).then(data => setResultsRoadmap(data));
    DataStore.query(Resource).then(data => setResultsResource(data));
  }, []) 

  const theme = createTheme({
    type: "dark",
    theme: {},
  });

  const keyMap = {
    TOGGLE_SEARCH: "shift+k",
  };

  const handlers = {
    TOGGLE_SEARCH: () => setVisible(!visible),
  };

  return (
    <NextUIProvider theme={theme}>
      <Modal open={visible} scroll blur onClose={() => setVisible(false)} width="65%">
        <Modal.Header>
          <Text size={20} b>Search</Text>
        </Modal.Header>
        <Modal.Body>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for roadmaps, resources, ..." bordered color="primary" size="lg" />
          <Spacer />
          {resultsRoadmap.map(roadmap => roadmap.name.toLowerCase().includes(query.toLowerCase()) || roadmap.description.toLowerCase().includes(query.toLowerCase()) ? (
            <Button light css={{ textAlign: "left", alignItems: "left", justifyItems: "left" }}><Text>{roadmap.name} - {roadmap.description.substr(0, 50)}</Text></Button>
          ) : null)}
          {resultsResource.map(resource => resource.name.toLowerCase().includes(query.toLowerCase()) || resource.description.toLowerCase().includes(query.toLowerCase()) ? (
            <Button light><Text>{resource.name} - {resource.description.substr(0, 50)}</Text></Button>
          ) : null)}
        </Modal.Body>
      </Modal>
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
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            href: "/logo.png",
          },
        ]}
      />
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
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
