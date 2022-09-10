import type { NextPage } from "next";
import Navbar from "../components/Navbar_";
import { Container, Spacer, Button, Link } from "@nextui-org/react";
import GradientText from "../components/GradientText";

const Home: NextPage = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Navbar loggedin={false} active={0} />
      <Spacer y={10} />
      <Container display="flex" alignItems="center" direction="column">
        <GradientText />
        <Button as={Link} color={"gradient"} ghost auto href="/roadmaps">Explore Roadmaps</Button>
      </Container>
    </div>
  );
};

export default Home;
