import { NodeProps, useReactFlow } from 'react-flow-renderer';

export function useNodeRightClick(id: NodeProps['id']) {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  const onClick = () => {
    setNodes((nodes) =>
      // @ts-ignore
      nodes.filter((node) => node.id != id)
    );
    setEdges((edges) =>
      edges.filter((edge) => edge.target != id && edge.source != id)
    );
  };

  return onClick;
}

export default useNodeRightClick;
