import DailyRoadmap from "../components/DailyRoadmap";
import Navbar from "../components/Navbar_";
import {
  Card,
  Grid,
  Text,
  Row,
  Button,
  Badge,
  Modal,
  Table,
  Container,
  Link,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Plus, PaperFail } from "react-iconly";
import { DataStore } from "@aws-amplify/datastore";
import { Auth } from "aws-amplify";
import { Roadmap, RoadmapResource } from "../models";
import Flow from "../components/Flow";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";

export default function Roadmaps() {
  const [loggedin, setLoggedin] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalNodes, setModalNodes] = useState([]);
  const [modalEdges, setModalEdges] = useState([]);
  const [modalResources, setModalResources] = useState<RoadmapResource[]>([]);
  const router = useRouter();

  const shareText1 = "I just found the perfect roadmap for learning ";
  const shareText2 =
    " and you can too! Find the perfect roadmap for learning your favorite skill here: ";

  useEffect(() => {
    (async () => {
      setRoadmaps(await DataStore.query(Roadmap));
    })();
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setLoggedin(true);
        setUser(data.attributes.email);
      })
      .catch((e) => setLoggedin(false));
  }, []);

  const checkUser = () => {
    if (!loggedin) {
      toast.error("You need to be logged in to add a resource!");
      router.push("/login");
      return;
    }
    router.push("/create");
  };

  async function deleteRoadmap(id: string) {
    DataStore.delete((await DataStore.query(Roadmap, id)) as Roadmap);
  }

  const openRoadmap = (idx: number) => {
    setModalTitle(roadmaps[idx].name);
    setModalDescription(roadmaps[idx].description);
    // @ts-ignore
    setModalNodes(roadmaps[idx].flow.nodes || []);
    // @ts-ignore
    setModalEdges(roadmaps[idx].flow.edges || []);
    setModalResources(roadmaps[idx]?.resources as RoadmapResource[]);
    setVisible(true);
  };

  return (
    <>
      <Head>
        <title>Roadmaps - Cesta</title>
        <meta property="og:title" content="Roadmaps | Cesta" />
      </Head>
      <Navbar active={1} />
      <Modal
        open={visible}
        blur
        closeButton
        scroll
        width="65%"
        onClose={() => setVisible(false)}
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
      <DailyRoadmap openRoadmap={openRoadmap} />
      <Text h1 size={60} css={{ paddingLeft: "$20" }}>
        Explore Roadmaps
      </Text>
      <Grid.Container gap={2} css={{ padding: "$20" }}>
        {roadmaps.map((roadmap, idx) => (
          <Grid xs={4} key={idx}>
            <Card isHoverable>
              <Card.Header>
                <Row justify="space-between">
                  <Row>
                    <Text b>{roadmap.name}</Text>
                    {roadmap.verified ? (
                      <Badge color="primary" variant="flat">
                        Verified
                      </Badge>
                    ) : null}
                  </Row>
                  {roadmap.user == user ? (
                    <Button
                      light
                      auto
                      onClick={() => deleteRoadmap(roadmap.id)}
                    >
                      <PaperFail set="bulk" primaryColor="red" />
                    </Button>
                  ) : null}
                </Row>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <Text>{roadmap.description}</Text>
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row justify="flex-end">
                  <Button size="sm" light>
                    {roadmap.resources?.length} resources
                  </Button>
                  <Button size="sm" onClick={() => openRoadmap(idx)}>
                    Explore
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
        <Grid xs={4}>
          <Card isHoverable isPressable onPress={checkUser}>
            <Card.Body
              css={{
                py: "$10",
                background: "var(--nextui-colors-blue600)",
                minHeight: "200px",
              }}
            >
              <Plus
                set="bulk"
                size={84}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
