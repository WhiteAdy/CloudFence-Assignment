import { Handle, Position, useReactFlow, useViewport } from '@xyflow/react';
import './ResourceNode.styles.scss';
import { RESOURCE_NODE_UTILS } from './ResourceNode.utils';
import { CustomNodeProps } from '../nodes.types';
import clsx from 'clsx';
import { useCallback } from 'react';

function ResourceNode({ data: { record }, ...nodeProps }: CustomNodeProps) {
  const { zoom } = useViewport();
  const { setCenter } = useReactFlow();

  const onClickResource = useCallback(() => {
    setCenter(
      nodeProps.positionAbsoluteX + nodeProps.width! / 2,
      nodeProps.positionAbsoluteY + nodeProps.height! / 2,
      { zoom: 2.5, duration: 500 },
    );
  }, [nodeProps, setCenter]);

  return (
    <button
      className={clsx('ResourceNode', { 'ResourceNode--isZoomed': zoom > 2 })}
      style={{
        width: RESOURCE_NODE_UTILS.WIDTH,
        height: RESOURCE_NODE_UTILS.HEIGHT,
      }}
      onClick={onClickResource}
    >
      <span className="ResourceNode_resourceName">{record.resourceName}</span>
      <span className="ResourceNode_resourceARN">{record.resourceARN}</span>
      <Handle
        type="target"
        position={Position.Right}
        id={`handle-${record.resourceARN}`}
        isConnectable={false}
        hidden={nodeProps.selected}
      />
    </button>
  );
}

export default ResourceNode;
