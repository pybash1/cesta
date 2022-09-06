import DailyRoadmap from "../components/DailyRoadmap";
import Navbar from "../components/Navbar_";
import { Card, Grid, Text, Row, Button, Badge } from "@nextui-org/react";

export default function Roadmaps() {
  return (
    <>
      <Navbar active={1} />
      <DailyRoadmap />
      <Text h1 size={60} css={{ paddingLeft: "$20" }}>
        Explore Roadmaps
      </Text>
      <Grid.Container gap={2} css={{ padding: "$20" }}>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Roadmap Name</Text>
              <Badge color="primary" variant="flat">
                Verified
              </Badge>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                est, facere iusto laboriosam iure hic aliquid, nihil, corrupti
                sapiente fugit minus animi libero officiis eaque nesciunt ex!
                Fugiat, praesentium veniam.
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light>
                  Resources
                </Button>
                <Button size="sm">Explore</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Roadmap Name</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                est, facere iusto laboriosam iure hic aliquid, nihil, corrupti
                sapiente fugit minus animi libero officiis eaque nesciunt ex!
                Fugiat, praesentium veniam.
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light>
                  Resources
                </Button>
                <Button size="sm">Explore</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Roadmap Name</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                est, facere iusto laboriosam iure hic aliquid, nihil, corrupti
                sapiente fugit minus animi libero officiis eaque nesciunt ex!
                Fugiat, praesentium veniam.
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light>
                  Resources
                </Button>
                <Button size="sm">Explore</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
