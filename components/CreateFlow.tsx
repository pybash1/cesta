import ReactFlow, { Background, Edge, Node, ProOptions, ReactFlowProvider } from 'react-flow-renderer';

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
  {
    id: '2',
    data: { label: '+' },
    position: { x: 0, y: 150 },
    type: 'placeholder',
  },
];

const defaultEdges: Edge[] = [
  {
    id: '1=>2',
    source: '1',
    target: '2',
    type: 'placeholder',
  },
];

const fitViewOptions = {
  padding: 0.95,
};

function ReactFlowPro() {
  useLayout();

  return (
    <>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitViewOptions={fitViewOptions}
        zoomOnDoubleClick={false}
        minZoom={0.2}
      >
        <Background />
      </ReactFlow>
    </>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
