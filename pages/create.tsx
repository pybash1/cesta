import Navbar from "../components/Navbar_";
import { Button, Container, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import CreateFlow from "../components/CreateFlow";
import { useState } from "react";

export default function Create() {
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmit = () => {
    console.log(name);
    console.log(desc);
    if (rfInstance) {
      // @ts-ignore
      const flow = rfInstance.toObject();
      console.log(flow);
    }
  }

  return (
    <>
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
          <CreateFlow onInit={ref => setRfInstance(ref)} />
        </div>
        <Spacer y={2} />
        <Button onClick={onSubmit}>Create Roadmap</Button>
      </Container>
    </>
  );
}
