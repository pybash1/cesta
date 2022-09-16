import { DataStore } from "@aws-amplify/datastore";
import { Grid, Text, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Roadmap } from "../models";
import Flow from "./Flow";

export default function DailyRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    DataStore.query(Roadmap).then(data => {
      setRoadmap(data[Math.floor(Math.random()*data.length)])
    });
  }, [])

  return (
    <>
      {roadmap != null ? (
        <Grid.Container gap={2} justify={"space-between"} css={{ padding: "$20" }}>
          <Grid>
            <Text
              h1
              size={60}
              weight={"bold"}
            >
              Today&apos;s Featured Roadmap
            </Text>
            <br />
            <Link href="/roadmap/id">
              <Text color="primary" h2 size={40} weight={"bold"}>
                {roadmap?.name}
              </Text>
            </Link>
            <br />
            <Text>
              {roadmap?.description}
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
              {/* @ts-ignore */}
              <Flow onInit={() => {}} initialNodes={roadmap.flow.nodes || []} initialEdges={roadmap.flow.edges || []} />
            </div>
          </Grid>
        </Grid.Container>
      ) : null}
    </>
  );
}
