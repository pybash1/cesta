import Navbar from "../components/Navbar_";
import {
  Text,
  Input,
  Row,
  Checkbox,
  Button,
  Container,
  Spacer,
} from "@nextui-org/react";
import { Message, User } from "react-iconly";

export default function Login() {
  return (
    <>
      <Navbar active={100} />
      <Spacer y={4} />
      <Container css={{ width: "50%" }}>
        <Text size={18}>
          Welcome Back to{" "}
          <Text b size={18}>
            Cesta
          </Text>
        </Text>
        <Spacer />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Message />}
        />
        <Spacer />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
        </Row>
        <Spacer />
        <Button auto onClick={console.log}>
          Login
        </Button>
      </Container>
    </>
  );
}
