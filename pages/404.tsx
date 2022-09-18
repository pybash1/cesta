import { Container, Text, Button, Spacer, Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "120vw",
        background:
          "url(https://uploads-ssl.webflow.com/609124aa26f8d4863c88a6d9/6140b34198c4a2bf8e7e6224_1920%3A1080.png)",
        backgroundSize: "cover",
      }}
    >
      <Text
        h1
        size={96}
        css={{ paddingTop: "$36", paddingLeft: "$36", color: "black" }}
      >
        404
      </Text>
      <Text
        size={20}
        css={{ paddingLeft: "$36", color: "black" }}
      >
        This page does not exist!
      </Text>
      <Spacer />
      <Button css={{ marginLeft: "$36" }} auto ghost as={Link} href="/">Go Home</Button>
    </div>
  );
}
