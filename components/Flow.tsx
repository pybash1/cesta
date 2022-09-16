import ReactFlow, { Background, Edge, Node, OnInit, ReactFlowProvider } from 'react-flow-renderer';

import useLayout from '../hooks/useLayout';

import nodeTypes from './NodeTypes';
import edgeTypes from './EdgeTypes';


const defaultNodes: Node<any>[] = [
  {
    id: '1',
    data: { label: 'Start Learning' },
    position: { x: 0, y: 0 },
    type: 'workflow',
  },
];

const defaultEdges: Edge[] = [];

const fitViewOptions = {
  padding: 0.95,
};

function ReactFlowPro({ onInit, initialNodes, initialEdges }: { onInit: OnInit, initialNodes: Node[], initialEdges: Edge[] }) {
  useLayout();

  return (
    <>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        zoomOnDoubleClick={false}
        minZoom={0.2}
        onInit={onInit}
      >
        <Background />
      </ReactFlow>
    </>
  );
}

function ReactFlowWrapper({ onInit, initialNodes, initialEdges }: { onInit: OnInit, initialNodes: Node[], initialEdges: Edge[] }) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro onInit={onInit} initialNodes={initialNodes} initialEdges={initialEdges} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
