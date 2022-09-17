import {
  Text,
  Grid,
  Button,
  Container,
  Spacer,
  Card,
  Row,
  Modal,
  Input,
  Checkbox,
  Textarea,
  Link,
} from "@nextui-org/react";
import { Auth, DataStore } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, PaperFail } from "react-iconly";
import Navbar from "../components/Navbar_";
import { Resource } from "../models";

export default function Resources() {
  const [visible, setVisible] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [free, setFree] = useState(false);
  const [oss, setOss] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    DataStore.query(Resource).then((data) => setResources(data));
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setLoggedin(true);
        setUser(data.attributes.email);
      })
      .catch((e) => setLoggedin(false));
  }, []);

  const addResource = () => {
    if (!name || !description || !link) {
      toast.error("Name, description, and link are required!");
      return;
    }

    let tags: string[] = [];
    if (free) tags.push("Free");
    if (oss) tags.push("Open Source");
    if (paid) tags.push("Paid");

    Auth.currentAuthenticatedUser()
      .then((data) => {
        try {
          DataStore.save(
            new Resource({
              name,
              description,
              link,
              tags,
              user: data.attributes.email,
            })
          )
            .then((data) => setVisible(false))
            .catch((e) => {
              toast.error("Link must be a valid URL!");
            });
        } catch (e) {
          console.log(e);
          toast.error("Link must be a valid URL!");
        }
      })
      .catch((e) => {
        toast.error("You need to be logged in to add a resource!");
        router.push("/login");
        return;
      });

    DataStore.query(Resource).then((data) => setResources(data));
  };

  const checkUser = () => {
    if (!loggedin) {
      toast.error("You need to be logged in to add a resource!");
      router.push("/login");
      return;
    }
    setVisible(true);
  };

  async function deleteResource(id: string) {
    const resource = await DataStore.query(Resource, id);
    DataStore.delete(resource as Resource);
    toast.success("Successfully deleted resource!");
  }

  return (
    <>
      <Navbar active={2} />
      <Modal open={visible} closeButton onClose={() => setVisible(false)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add a New{" "}
            <Text b size={18}>
              Resource
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Name"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Description"
          />
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Link"
          />
          <Text size={16}>Tags</Text>
          <Checkbox onChange={(e) => setOss(e)}>
            <Text size={14}>Open Source</Text>
          </Checkbox>
          <Checkbox onChange={(e) => setFree(e)}>
            <Text size={14}>Free</Text>
          </Checkbox>
          <Checkbox onChange={(e) => setPaid(e)}>
            <Text size={14}>Paid</Text>
          </Checkbox>
          <Text size={14} color="warning">
            Troll, fake, or spam resources are subject to getting removed!
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={addResource}>
            Add Resource
          </Button>
        </Modal.Footer>
      </Modal>
      <Spacer y={3} />
      <Container>
        <Text h1 size={50}>
          Find Resources on Everything
        </Text>
      </Container>
      <Container display="flex" alignItems="center">
        <Text h2 size={20}>
          Find by Category
        </Text>
        <Spacer />
        <Button.Group color="primary" ghost>
          <Button>Open Source</Button>
          <Button>Free</Button>
          <Button>Paid</Button>
        </Button.Group>
      </Container>
      <Spacer y={4} />
      <Grid.Container gap={4} css={{ paddingRight: "$20", paddingLeft: "$20" }}>
        {resources.map((resource, idx) => (
          <Grid xs={4} key={idx}>
            <Card isHoverable>
              <Card.Header>
                <Row justify="space-between">
                  <Text b>{resource.name}</Text>
                  {resource.user == user ? (
                    <Button
                      light
                      auto
                      onClick={() => deleteResource(resource.id)}
                    >
                      <PaperFail set="bulk" primaryColor="red" />
                    </Button>
                  ) : null}
                </Row>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <Text>{resource.description}</Text>
              </Card.Body>
              <Card.Divider />
              <Card.Footer>
                <Row justify="flex-end">
                  <Button size="sm" light>
                    {resource.tags?.join(", ")}
                  </Button>
                  <Button
                    size="sm"
                    as={Link}
                    href={resource.link}
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
                minHeight: "200px"
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
