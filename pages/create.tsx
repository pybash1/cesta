import Navbar from "../components/Navbar_";
import { Container, Input, Spacer, Text, Textarea } from "@nextui-org/react";

export default function Create() {
  return (
    <>
      <Navbar active={3} />
      <Container
        fluid
        css={{ padding: "$20", width: "50%" }}
        display="flex"
        direction="column"
      >
        <Text h1 size={45} css={{ textAlign: "center" }}>Create a New Roadmap</Text>
        <Spacer y={2} />
        <Input labelPlaceholder="Roadmap Name" color="primary" clearable bordered />
        <Spacer y={2} />
        <Textarea
          labelPlaceholder="Roadmap Description"
          bordered
          helperText="Good descriptions are conscise and easy to understand"
          color="primary"
        />
      </Container>
    </>
  );
}
