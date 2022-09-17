import { DataStore } from "@aws-amplify/datastore";
import { Grid, Text, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Roadmap } from "../models";
import Flow from "./Flow";

export default function DailyRoadmap({ openRoadmap }: { openRoadmap: (idx: number) => void }) {
  const [idx, setIdx] = useState<number | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    DataStore.query(Roadmap).then(data => {
      let idx = Math.floor(Math.random()*data.length);
      setIdx(idx);
      setRoadmap(data[idx]);
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
            <Button auto light onClick={() => openRoadmap(idx as number)}>
              <Text color="primary" h2 size={40} weight={"bold"}>
                {roadmap?.name}
              </Text>
            </Button>
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
