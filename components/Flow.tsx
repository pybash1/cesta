import { useState } from "react";
import ReactFlow, { Controls } from "react-flow-renderer";

interface Props {
  initialNodes: {
    id: string;
    type?: string | undefined;
    data: {
      label: string | Element | JSX.Element;
    };
    position: {
      x: number;
      y: number;
    };
  }[];
  initialEdges: {
    id: string;
    source: string;
    target: string;
  }[];
}

function Flow({
  initialNodes,
  initialEdges,
}: Props) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
    >
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
