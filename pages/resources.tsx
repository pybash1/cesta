import {
  Text,
  Grid,
  Button,
  Container,
  Spacer,
  Card,
  Badge,
  Row,
} from "@nextui-org/react";
import Navbar from "../components/Navbar_";

export default function Resources() {
  return (
    <>
      <Navbar active={2} />
      <Spacer y={3} />
      <Container>
        <Text h1 size={50}>
          Find Resources on Everything
        </Text>
      </Container>
      <Container display="flex" alignItems="center">
        <Text h2 size={20}>
          Find by Category
        </Text>
        <Spacer />
        <Button.Group color="primary" ghost>
          <Button>Open Source</Button>
          <Button>Free</Button>
          <Button>Paid</Button>
        </Button.Group>
      </Container>
      <Spacer y={4} />
      <Grid.Container gap={4} css={{ paddingRight: "$20", paddingLeft: "$20" }}>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Resource Name</Text>
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
                  Open Source
                </Button>
                <Button size="sm">Visit</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Ad Name</Text>
              <Badge color="primary" variant="flat">
                Promoted
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
                  Company
                </Button>
                <Button size="sm">Visit</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card isHoverable>
            <Card.Header>
              <Text b>Resource Name</Text>
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
                  Paid
                </Button>
                <Button size="sm">Visit</Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </>
  );
}
