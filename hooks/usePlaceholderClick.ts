import { Edge, Node, NodeProps, useReactFlow } from 'react-flow-renderer';

import { uuid } from '../utils';

export function usePlaceholderClick(id: NodeProps['id']) {
  const { getNode, setNodes, setEdges } = useReactFlow();

  const createNode = (label: string) => {
    const parentNode = getNode(id);
    console.log(id, parentNode)
    const childPlaceholderId = uuid();

    const childPlaceholderNode = {
      id: childPlaceholderId,
      position: { x: parentNode?.position.x, y: parentNode?.position.y },
      type: 'placeholder',
      data: { label: '+' },
    };

    const childPlaceholderEdge = {
      id: `${parentNode?.id}=>${childPlaceholderId}`,
      source: parentNode?.id,
      target: childPlaceholderId,
      type: 'placeholder',
    };

    setNodes((nodes) =>
      nodes
        .map((node) => {
          if (node.id === id) {
            return {
              ...node,
              type: 'workflow',
              data: { label },
            };
          }
          return node;
        })
        .concat([childPlaceholderNode as Node])
    );

    setEdges((edges) =>
      edges
        .map((edge) => {
          if (edge.target === id) {
            return {
              ...edge,
              type: 'custom',
            };
          }
          return edge;
        })
        .concat([childPlaceholderEdge as Edge])
    );
  };

  return createNode;
}

export default usePlaceholderClick;
