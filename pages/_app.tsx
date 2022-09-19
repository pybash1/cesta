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
  Link,
  Row,
  Container,
  Table,
} from "@nextui-org/react";
import { IconlyProvider } from "react-iconly";
import { Toaster } from "react-hot-toast";
import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { DefaultSeo } from "next-seo";
import { useState, useEffect } from "react";
import { GlobalHotKeys } from "react-hotkeys";
import { Resource, Roadmap, RoadmapResource } from "../models";
import Flow from "../components/Flow";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const [visible, setVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [resultsRoadmap, setResultsRoadmap] = useState<Roadmap[]>([]);
  const [resultsResource, setResultsResource] = useState<Resource[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalNodes, setModalNodes] = useState([]);
  const [modalEdges, setModalEdges] = useState([]);
  const [modalResources, setModalResources] = useState<RoadmapResource[]>([]);

  const shareText1 = "I just found the perfect roadmap for learning ";
  const shareText2 =
    " and you can too! Find the perfect roadmap for learning your favorite skill here: ";

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

  const openRoadmap = (idx: number) => {
    setModalTitle(resultsRoadmap[idx].name);
    setModalDescription(resultsRoadmap[idx].description);
    // @ts-ignore
    setModalNodes(resultsRoadmap[idx].flow.nodes || []);
    // @ts-ignore
    setModalEdges(resultsRoadmap[idx].flow.edges || []);
    setModalResources(resultsRoadmap[idx]?.resources as RoadmapResource[]);
    setRoadmapVisible(true);
  }

  return (
    <NextUIProvider theme={theme}>
      <Modal
        open={roadmapVisible}
        blur
        closeButton
        scroll
        width="65%"
        onClose={() => setRoadmapVisible(false)}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {modalTitle}
          </Text>
        </Modal.Header>
        <Modal.Body css={{ padding: "$10" }}>
          <Text
            id="modal-description"
            css={{ paddingLeft: "$10", paddingRight: "$10" }}
          >
            {modalDescription}
          </Text>
          <Row>
            <Container>
              <Text b size={20} id="modal-description">
                Roadmap
              </Text>
              <div style={{ width: "500px", height: "700px" }}>
                <Flow
                  onInit={() => {}}
                  initialNodes={modalNodes}
                  initialEdges={modalEdges}
                />
              </div>
            </Container>
            <Container>
              <Text b size={20} id="modal-description">
                Resources
              </Text>
              <Table>
                <Table.Header>
                  <Table.Column>Name</Table.Column>
                  <Table.Column>Description</Table.Column>
                </Table.Header>
                <Table.Body>
                  {modalResources.map((resource, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell>
                        <Link href={resource?.link}>{resource?.name}</Link>
                      </Table.Cell>
                      <Table.Cell>{resource?.description}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Container>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Modal
            open={shareVisible}
            blur
            closeButton
            onClose={() => setShareVisible(false)}
          >
            <Modal.Header>
              <Text b size={20}>
                Share
              </Text>
            </Modal.Header>
            <Modal.Body
              css={{
                paddingLeft: "$20",
                paddingRight: "$20",
                paddingBottom: "$10",
              }}
            >
              <Button
                as={Link}
                href={`https://twitter.com/intent/tweet?text=${shareText1}${modalTitle}${shareText2}&url=https://cesta-project.vercel.app`}
                target="_blank"
              >
                Tweet
              </Button>
              <Button
                as={Link}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cesta-project.vercel.app/`}
                target="_blank"
              >
                LinkedIn
              </Button>
              <Button
                as={Link}
                href={`https://web.whatsapp.com/send?text=${shareText1}${modalTitle}${shareText2}%20https://cesta-project.vercel.app/`}
                target="_blank"
              >
                WhatsApp
              </Button>
              <Button
                as={Link}
                href={`https://t.me/share/url?url=https://cesta-project.vercel.app/&text=${shareText1}${modalTitle}${shareText2}%20https://cesta-project.vercel.app/`}
                target="_blank"
              >
                Telegram
              </Button>
              <Button
                as={Link}
                href={`https://discord.com/channels/@me`}
                target="_blank"
              >
                Discord
              </Button>
              <Button
                as={Link}
                href={`mailto:?subject=Find the perfect roadmap!&body=${shareText1}${modalTitle}${shareText2}%20https://cesta-project.vercel.app/`}
                target="_blank"
              >
                Email
              </Button>
              <CopyToClipboard
                text={`${shareText1}${modalTitle}${shareText2} https://cesta-project.vercel.app/`}
                onCopy={() => toast.success("Copied to clipboard!")}
              >
                <Button as={Link}>Copy as Text</Button>
              </CopyToClipboard>
            </Modal.Body>
          </Modal>
          <Button auto onClick={() => setShareVisible(true)}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal open={visible} scroll blur onClose={() => setVisible(false)} width="65%">
        <Modal.Header>
          <Text size={20} b>Search</Text>
        </Modal.Header>
        <Modal.Body>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for roadmaps, resources, ..." bordered color="primary" size="lg" />
          <Spacer />
          {resultsRoadmap.map((roadmap, idx) => roadmap.name.toLowerCase().includes(query.toLowerCase()) || roadmap.description.toLowerCase().includes(query.toLowerCase()) ? (
            <Button light auto as={Link} onClick={() => openRoadmap(idx)}><Text>{roadmap.name} - {roadmap.description.substr(0, 50)}</Text></Button>
          ) : null)}
          {resultsResource.map(resource => resource.name.toLowerCase().includes(query.toLowerCase()) || resource.description.toLowerCase().includes(query.toLowerCase()) ? (
            <Button light as={Link} href={resource.link} target="_blank"><Text>{resource.name} - {resource.description.substr(0, 50)}</Text></Button>
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
