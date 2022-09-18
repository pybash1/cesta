import Navbar from "../components/Navbar_";
import {
  Text,
  Input,
  Row,
  Checkbox,
  Button,
  Container,
  Spacer,
  Modal,
  Link,
} from "@nextui-org/react";
import { Message, User, Password } from "react-iconly";
import { signIn, signUp } from "../utils";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Head from "next/head";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => router.push("/"))
      .catch((e) => {
        console.log(e);
      });
  });

  const handleSignUp = () => {
    if (!email || !name || !username) {
      toast.error("Email, name, or username is missing!");
      return;
    }
    signUp(username, password, email, name)
      .then((data) => console.log(data))
      .catch((e) => {
        toast.error(e.toString());
        return;
      });
    setVisible(true);
    return;
  };

  const verify = () => {
    if (!code) {
      toast.error("Code cannot be empty!");
      return;
    }
    Auth.confirmSignUp(email, code)
      .then((data) => {
        signIn(email, password)
          .then((data) => {
            router.push("/");
            toast.success("Signed in successfully!");
          })
          .catch((e) => {
            if (
              e.toString() ==
              "UserNotConfirmedException: User is not confirmed."
            ) {
              toast.error("User is not confirmed!");
              return;
            } else if (
              e.toString() ==
              "NotAuthorizedException: Incorrect username or password."
            ) {
              toast.error("Incorrect email or password!");
              return;
            } else {
              toast.error(e.toString());
              return;
            }
          });
        toast.success("Verified email successfully!");
      })
      .catch((e) => {
        console.log(e.toString());
        if (
          e.toString() ==
          "NotAuthorizedException: User cannot be confirmed. Current status is CONFIRMED"
        ) {
          toast.error("User is already verified!");
          return;
        } else {
          toast.error("Incorrect verification code!");
          return;
        }
      });
  };

  return (
    <>
      <Head>
        <title>Sign Up - Cesta</title>
      </Head>
      <Navbar active={100} />
      <Modal open={visible} blur preventClose>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Verify your Email
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Verification Code"
            contentLeft={<Message />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={verify}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          contentLeft={<Message set="bulk" />}
        />
        <Spacer />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<Password set="bulk" />}
        />
        <Spacer />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Name"
          contentLeft={<User set="bulk" />}
        />
        <Spacer />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Username"
          labelLeft="@"
        />
        <Spacer />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <Link href="/login">
            <Text size={14}>Already have an account?</Text>
          </Link>
        </Row>
        <Spacer />
        <Button auto onClick={handleSignUp}>
          Sign Up
        </Button>
      </Container>
    </>
  );
}
