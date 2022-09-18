import Navbar from "../components/Navbar_";
import {
  Button,
  Container,
  Input,
  Spacer,
  Table,
  Text,
  Textarea,
} from "@nextui-org/react";
import CreateFlow from "../components/CreateFlow";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Roadmap, RoadmapResource } from "../models";
import toast from "react-hot-toast";
import Head from "next/head";

export default function Create() {
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [resources, setResources] = useState<RoadmapResource[]>([]);
  const [resourceName, setResourceName] = useState("");
  const [resourceDesc, setResourceDesc] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setUser(data.attributes.email);
      })
      .catch((e) => {
        router.push("/login");
      });
  });

  const onSubmit = () => {
    console.log(name);
    console.log(desc);
    if (rfInstance) {
      // @ts-ignore
      const flow = rfInstance.toObject();
      const jsonFlow = JSON.stringify(flow);
      DataStore.save(
        new Roadmap({
          name,
          description: desc,
          flow: jsonFlow,
          resources,
          user,
          verified: false,
        })
      ).then((data) => {
        router.push("/roadmaps");
      });
    }
  };

  const addResource = () => {
    if (!resourceName || !resourceDesc || !resourceLink) {
      toast.error("Resource name, description, and link are required!");
      return;
    }

    try {
      setResources(
        resources.concat(
          new RoadmapResource({
            name: resourceName,
            description: resourceDesc,
            link: resourceLink,
            user,
          })
        )
      );
      setResourceName("");
      setResourceDesc("");
      setResourceLink("");
    } catch (e) {
      toast.error("Link must be a valid URL!");
      return;
    }
  };

  const removeResource = (idx: number) => {
    setResources(resources.splice(idx - 1, 1));
  };

  return (
    <>
      <Head>
        <title>Create - Cesta</title>
        <meta property="og:title" content="Create | Cesta" />
      </Head>
      <Navbar active={3} />
      <Container
        fluid
        css={{ padding: "$20", width: "50%" }}
        display="flex"
        direction="column"
      >
        <Text h1 size={45} css={{ textAlign: "center" }}>
          Create a New Roadmap
        </Text>
        <Spacer y={2} />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          labelPlaceholder="Roadmap Name"
          color="primary"
          clearable
          bordered
        />
        <Spacer y={2} />
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          labelPlaceholder="Roadmap Description"
          bordered
          helperText="Good descriptions are conscise and easy to understand"
          color="primary"
        />
        <Spacer y={2} />
        <div style={{ width: "50vw", height: "50vh" }}>
          <CreateFlow onInit={(ref) => setRfInstance(ref)} />
        </div>
        <Spacer y={2} />
        <Text b size={20}>
          Resources
        </Text>
        <Spacer />
        <Table>
          <Table.Header>
            <Table.Column>Resource Name</Table.Column>
            <Table.Column>Resource Description</Table.Column>
            <Table.Column>Resource Link</Table.Column>
            <Table.Column>{}</Table.Column>
          </Table.Header>
          <Table.Body>
            {resources.map((resource, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{resource.name}</Table.Cell>
                <Table.Cell>{resource.description}</Table.Cell>
                <Table.Cell>{resource.link}</Table.Cell>
                <Table.Cell>
                  <Button auto onClick={() => removeResource(idx)}>
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Spacer />
        <Container>
          <Input
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            labelPlaceholder="Resource Name"
            color="primary"
            width="$80"
            clearable
            bordered
          />
          <Spacer />
          <Textarea
            value={resourceDesc}
            onChange={(e) => setResourceDesc(e.target.value)}
            labelPlaceholder="Resource Description"
            color="primary"
            width="$80"
            bordered
          />
          <Spacer />
          <Input
            value={resourceLink}
            onChange={(e) => setResourceLink(e.target.value)}
            labelPlaceholder="Roadmap Link"
            color="primary"
            width="$80"
            clearable
            bordered
          />
          <Spacer />
          <Button onClick={addResource}>Add Resource</Button>
        </Container>
        <Spacer y={2} />
        <Button onClick={onSubmit}>Create Roadmap</Button>
      </Container>
    </>
  );
}
