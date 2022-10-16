import { Handle, Position, NodeProps } from "react-flow-renderer";
import cx from "classnames";

import styles from "./NodeTypes.module.css";
import usePlaceholderClick from "../../hooks/usePlaceholderClick";
import { useState } from "react";
import { InputModal } from "../InputModal";

interface BaseNodeProps extends NodeProps {
  className?: string;
  isDropzone?: boolean;
}

const PlaceholderNode = ({ id, type, data, className }: BaseNodeProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const createNode = usePlaceholderClick(id);
  const nodeClasses = cx(styles.node, styles.placeholder, className);

  const handleNodeClick = () => {
    setModalVisible(true);
  };
  const handleSubmit = (value: string) => createNode(value);

  return (
    <div
      onClick={handleNodeClick}
      className={nodeClasses}
      title="click to add a node"
    >
      {data.label}
      {type !== "data" && (
        <Handle
          className={styles.handle}
          type="target"
          position={Position.Top}
        />
      )}
      {type !== "output" && (
        <Handle
          type="source"
          position={Position.Bottom}
          className={styles.handle}
          isConnectable={false}
        ></Handle>
      )}
      <InputModal
        visible={modalVisible}
        handleClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        label="Enter value"
      />
    </div>
  );
};

export default PlaceholderNode;
