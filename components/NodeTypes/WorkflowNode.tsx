import { useCallback, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import cx from "classnames";

import styles from "./NodeTypes.module.css";
import useNodeClickHandler from "../../hooks/useNodeClick";
import useNodeRightClickHandler from "../../hooks/useNodeRightClick";
import { InputModal } from "../InputModal";

interface BaseNodeProps extends NodeProps {
  className?: string;
  isDropzone?: boolean;
}

const WorkflowNode = ({ id, type, data, className }: BaseNodeProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const clicked = useRef(false);
  const createNode = useNodeClickHandler(id);
  const handleNodeRightClick = useNodeRightClickHandler(id);
  const nodeClasses = cx(styles.node, className);

  const onClick = useCallback(() => {
    clicked.current = true;
    console.log("Click")
    setModalVisible(true);
  }, []);

  const handleSubmit = (value: string) => createNode(value);

  const onContextMenu = useCallback(
    (e: any) => {
      e.preventDefault();
      handleNodeRightClick();
    },
    [handleNodeRightClick]
  );

  return (
    <div
      onClick={onClick}
      onContextMenu={onContextMenu}
      className={nodeClasses}
      title="click to add a child node"
    >
      {id === "1" && !clicked.current && (
        <div className={styles.swoopyWrapper}>
          <div className={styles.swoopy}>⤹</div>
          <div className={styles.swoopyText}>
            click on a node to add a child node.
          </div>
        </div>
      )}

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

export default WorkflowNode;
