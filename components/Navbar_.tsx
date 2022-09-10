import { Navbar, Text, Spacer, Button, Link, Input } from "@nextui-org/react";
import { Search } from "react-iconly";

interface Props {
  active: number;
  loggedin?: boolean;
}

export default function Navbar_({ active, loggedin }: Props) {
  return (
    <Navbar isCompact isBordered>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          česta
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="highlight">
        {active == 0 ? (
          <Navbar.Link isActive href="/">
            Home
          </Navbar.Link>
        ) : (
          <Navbar.Link href="/">Home</Navbar.Link>
        )}
        {active == 1 ? (
          <Navbar.Link isActive href="/roadmaps">
            Roadmaps
          </Navbar.Link>
        ) : (
          <Navbar.Link href="/roadmaps">Roadmaps</Navbar.Link>
        )}
        {active == 2 ? (
          <Navbar.Link isActive href="/resources">
            Resources
          </Navbar.Link>
        ) : (
          <Navbar.Link href="/resources">Resources</Navbar.Link>
        )}
        {active == 3 && !loggedin ? (
          <Navbar.Link isActive href="/create">
            Create
          </Navbar.Link>
        ) : !loggedin ? (
          <Navbar.Link href="/create">Create</Navbar.Link>
        ) : null}
      </Navbar.Content>
      <Navbar.Content>
        <Input
          contentRightStyling={false}
          contentRight={
            <>
              <Spacer x={2} y={0} />
              <Button auto light as={Link} href="">
                <Search set="bulk" primaryColor="white" />
              </Button>
            </>
          }
          clearable
          labelPlaceholder="Search for roadmaps"
        />
        <Navbar.Item>
          <Button auto flat as={Link} href={loggedin ? "/create" : "/signup"}>
            {loggedin ? "Create" : "Get Started"}
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
