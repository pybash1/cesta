import Navbar from "../components/Navbar_";
import { Container, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import CreateFlow from "../components/CreateFlow";

export default function Create() {
  const nodes = [
    {
      id: "1",
      type: "special",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
    },

    {
      id: "2",
      type: "special",
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: "3",
      type: "special",
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
    },
  ];

  const edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3", animated: true },
  ];

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
          labelPlaceholder="Roadmap Name"
          color="primary"
          clearable
          bordered
        />
        <Spacer y={2} />
        <Textarea
          labelPlaceholder="Roadmap Description"
          bordered
          helperText="Good descriptions are conscise and easy to understand"
          color="primary"
        />
        <Spacer y={2} />
        <div style={{ width: "50vw", height: "50vh" }}>
          <CreateFlow nodes={nodes} edges={edges} />
        </div>
      </Container>
    </>
  );
}
