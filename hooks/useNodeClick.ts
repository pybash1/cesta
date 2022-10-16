import { NodeProps, useReactFlow, getOutgoers, Edge, Node } from 'react-flow-renderer';

import { uuid } from '../utils';

export function useNodeClick(id: NodeProps['id']) {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  const createNode = (label: string): void => {
    const parentNode = getNode(id);
    console.log(id, parentNode)
    const childNodeId = uuid();
    const childPlaceholderId = uuid();

    const childNode = {
      id: childNodeId,
      position: { x: parentNode?.position.x, y: parentNode?.position.y as number + 150 },
      type: 'workflow',
      data: { label },
    };

    const childPlaceholderNode = {
      id: childPlaceholderId,
      position: { x: childNode.position.x, y: childNode.position.y + 150 },
      type: 'placeholder',
      data: { label: '+' },
    };

    const childEdge = {
      id: `${parentNode?.id}=>${childNodeId}`,
      source: parentNode?.id,
      target: childNodeId,
      type: 'custom',
    };

    const childPlaceholderEdge = {
      id: `${childNodeId}=>${childPlaceholderId}`,
      source: childNodeId,
      target: childPlaceholderId,
      type: 'placeholder',
    };

    const existingPlaceholders = getOutgoers(parentNode as Node, getNodes(), getEdges())
      .filter((node) => node.type === 'placeholder')
      .map((node) => node.id);

    setNodes((nodes) =>
      // @ts-ignore
      nodes.filter((node) => !existingPlaceholders.includes(node.id)).concat([childNode, childPlaceholderNode])
    );
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([childEdge as Edge, childPlaceholderEdge])
    );
  };

  return createNode;
}

export default useNodeClick;
