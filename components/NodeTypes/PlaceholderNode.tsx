import { Handle, Position, NodeProps } from 'react-flow-renderer';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import usePlaceholderClick from '../../hooks/usePlaceholderClick';

interface BaseNodeProps extends NodeProps {
  className?: string;
  isDropzone?: boolean;
}

const PlaceholderNode = ({ id, type, data, className }: BaseNodeProps) => {
  const handleNodeClick = usePlaceholderClick(id);
  const nodeClasses = cx(styles.node, styles.placeholder, className);

  return (
    <div onClick={handleNodeClick} className={nodeClasses} title="click to add a node">
      {data.label}
      {type !== 'data' && <Handle className={styles.handle} type="target" position={Position.Top} />}
      {type !== 'output' && (
        <Handle type="source" position={Position.Bottom} className={styles.handle} isConnectable={false}></Handle>
      )}
    </div>
  );
};

export default PlaceholderNode;
