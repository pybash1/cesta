import { Navbar, Text, Spacer, Button, Link, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Search } from "react-iconly";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import NextLink from "next/link";

interface Props {
  active: number;
}

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Roadmaps",
    href: "/roadmaps",
  },
  {
    label: "Resources",
    href: "/resources",
  },
  {
    label: "Create",
    href: "/create",
  },
];

export default function Navbar_({ active }: Props) {
  const [loggedin, setLoggedin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => setLoggedin(true))
      .catch((e) => {
        setLoggedin(false);
      });
  });

  const handleSignOut = () => {
    Auth.signOut().then((data) => console.log(data));
    router.push("/");
  };

  return (
    <Navbar isCompact isBordered>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          česta
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="highlight">
        {navLinks.map((link, index) => (
          <NextLink href={link.href} key={index} passHref>
            <Navbar.Link isActive={index === active}>{link.label}</Navbar.Link>
          </NextLink>
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <NextLink href={loggedin ? "/create" : "/signup"}>
          <Button auto flat as={Link}>
            {loggedin ? "Create" : "Get Started"}
          </Button>
        </NextLink>
        <Navbar.Item>
          {loggedin ? (
            <Button auto flat onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <NextLink href="/login" passHref>
              <Button auto flat as={Link}>
                Sign In
              </Button>
            </NextLink>
          )}
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
