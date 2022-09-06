import { Grid, Text, Link } from "@nextui-org/react";
import Flow from "./Flow";

export default function DailyRoadmap() {
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 250, y: 25 },
    },

    {
      id: "2",
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "Output Node" },
      position: { x: 250, y: 250 },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ];

  return (
    <Grid.Container gap={2} justify={"space-between"} css={{ padding: "$20" }}>
      <Grid>
        <Text
          h1
          size={60}
          weight={"bold"}
          css={{ textGradient: "45deg, $blue600 0%, $red600 80%" }}
        >
          Today&apos;s Featured Roadmap
        </Text>
        <br />
        <Link href="/roadmap/id">
          <Text color="primary" h2 size={40} weight={"bold"}>
            Roadmap Name
          </Text>
        </Link>
        <br />
        <Text>
          Roadmap Description... Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestias earum voluptatem quam,
        </Text>
      </Grid>
      <Grid xs={4}>
        <div
          style={{
            height: "100%",
            width: "100%",
            border: "2px solid var(--nextui-colors-blue600)",
          }}
        >
          <Flow initialNodes={initialNodes} initialEdges={initialEdges} />
        </div>
      </Grid>
    </Grid.Container>
  );
}
