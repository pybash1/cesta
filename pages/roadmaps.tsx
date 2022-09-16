import DailyRoadmap from "../components/DailyRoadmap";
import Navbar from "../components/Navbar_";
import { Card, Grid, Text, Row, Button, Badge, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Plus, PaperFail } from "react-iconly";
import { DataStore } from "@aws-amplify/datastore";
import { Auth } from "aws-amplify";
import { Roadmap } from "../models";

export default function Roadmaps() {
  const [loggedin, setLoggedin] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [user, setUser] = useState("");
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

  return (
    <>
      <Navbar active={1} />
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
                  <Button
                    size="sm"
                    as={Link}
                    href={"/roadmap/" + roadmap.id}
                    target="_blank"
                  >
                    Visit
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
