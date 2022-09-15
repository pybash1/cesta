import Navbar from "../components/Navbar_";
import {
  Text,
  Input,
  Row,
  Checkbox,
  Button,
  Container,
  Spacer,
  Link,
  Modal
} from "@nextui-org/react";
import { Message, Password } from "react-iconly";
import { useEffect, useRef, useState } from "react";
import { signIn } from "../utils";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailch, setEmailch] = useState("");
  const [passwordch, setPasswordch] = useState("");
  const [code, setCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [emailchhid, setEmailchhid] = useState(false)
  const [codehid, setCodehid] = useState(true)
  const [passwordchhid, setPasswordchhid] = useState(true)
  const [btntext, setBtntext] = useState("Send Code");
  const btnRef = useRef(null);
  const router = useRouter();
  
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(data => router.push("/")).catch(e => {
      console.log(e)
    });
  })
  
  const verifyCode = () => {
    if (!code) {
      toast.error("Code is required!");
      return;
    }
    
    if (!passwordch) {
      toast.error("Password is required!");
      return;
    }

    Auth.forgotPasswordSubmit(emailch, code, passwordch).then(data => {
      console.log(data);
      toast.success("Password updated successfully!");
      setVisible(false);
    }).catch(e => {
      if (e.toString() == "UserNotFoundException: Username/client id combination not found.") {
        toast.error("User is not registered!");
        return;
      } else if (e.toString() == "CodeMismatchException: Invalid verification code provided, please try again.") {
        toast.error("Invalid code!");
        return;
      } else if (e.toString() == "LimitExceededException: Attempt limit exceeded, please try after some time.") {
        toast.error("Too many attempts! Try again after sometime.");
        return;
      } else if (e.toString() == "InvalidPasswordException: Password does not conform to policy: Password not long enough") {
        toast.error("Password must be at least 8 characters long, contain one number, special character, and capital letter!")
      } else {
        console.log(e);
        return;
      }
    })
  }

  const sendCode = () => {
    if (!emailch) {
      toast.error("Email is required!");
      return;
    }
    Auth.forgotPassword(emailch).then(data => console.log(data)).catch(e => {
      if (e.toString() == "UserNotFoundException: Username/client id combination not found.") {
        toast.error("User is not registered!");
        return;
      } else if (e.toString() == "InvalidParameterException: Cannot reset password for the user as there is no registered/verified email or phone_number") {
        toast.error("User has not verified their email!");
        return;
      } else {
        console.log(e);
        return;
      }
    });
    setEmailchhid(true);
    setCodehid(false);
    setPasswordchhid(false);
    setBtntext("Update Password");
    // @ts-ignore
    btnRef.current.onclick = verifyCode;
    return;
  }
  
  const handleForgot = () => {
    setVisible(true);
  }


  const handleSignIn = () => {
    if (!email || !password) {
      toast.error("Email or password is missing!");
      return;
    }

    signIn(email, password).then(data => {
      router.push("/");
      toast.success("Signed in successfully!")
    }).catch(e => {
      if (e.toString() == "UserNotConfirmedException: User is not confirmed.") {
        toast.error("User is not confirmed!")
      } else if (e.toString() == "NotAuthorizedException: Incorrect username or password.") {
        toast.error("Incorrect email or password!")
      } else {
        toast.error(e.toString())
      }
    });
  }

  return (
    <>
      <Navbar active={100} />
      <Modal open={visible} onClose={() => setVisible(false)}>
      <Modal.Header>
          <Text id="modal-title" size={18}>
            Forgot Password
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={emailch}
            onChange={e => setEmailch(e.target.value)}
            disabled={emailchhid}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Message />}
          />
          <Input
            value={code}
            onChange={e => setCode(e.target.value)}
            disabled={codehid}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Code"
            contentLeft={<Password />}
          />
          <Input.Password
            value={passwordch}
            onChange={e => setPasswordch(e.target.value)}
            disabled={passwordchhid}
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="New Password"
            contentLeft={<Password />}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button ref={btnRef} auto onClick={sendCode}>
            {btntext}
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
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          contentLeft={<Password set="bulk" />}
        />
        <Spacer />
        <Row justify="space-between">
          <Checkbox>
            <Text size={14}>Remember me</Text>
          </Checkbox>
          <div>
            <Link href="/signup">
              <Text size={14}>Don't have an account?</Text>
            </Link>
            <Link onClick={handleForgot}>
              <Text size={14}>Forgot password?</Text>
            </Link>
          </div>
        </Row>
        <Spacer />
        <Button auto onClick={handleSignIn}>
          Login
        </Button>
      </Container>
    </>
  );
}
