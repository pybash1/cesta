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
  Spacer,
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

export default function Roadmaps() {
  const [loggedin, setLoggedin] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [user, setUser] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalNodes, setModalNodes] = useState([]);
  const [modalEdges, setModalEdges] = useState([]);
  const [modalResources, setModalResources] = useState<RoadmapResource[]>([]);
  const router = useRouter();

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
              <Text
                b
                size={20}
                id="modal-description"
              >
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
              <Text
                b
                size={20}
                id="modal-description"
              >
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
                      <Table.Cell><Link href={resource?.link}>{resource?.name}</Link></Table.Cell>
                      <Table.Cell>{resource?.description}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Container>
          </Row>
        </Modal.Body>
      </Modal>
      <DailyRoadmap />
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
