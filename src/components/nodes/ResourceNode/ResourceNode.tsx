import { DataRecord } from '@api';
import { Handle, Node, Position } from '@xyflow/react';
import './ResourceNode.styles.scss';
import { RESOURCE_NODE_UTILS } from './ResourceNode.utils';

function ResourceNode({
  data: { resourceARN, resourceName },
  ...nodeProps
}: Node<DataRecord>) {
  return (
    <div
      className="ResourceNode"
      style={{
        width: RESOURCE_NODE_UTILS.WIDTH,
        height: RESOURCE_NODE_UTILS.HEIGHT,
      }}
    >
      <span className="ResourceNode_resourceName">{resourceName}</span>
      <span className="ResourceNode_resourceARN">{resourceARN}</span>
      <Handle
        type="target"
        position={Position.Right}
        id={`handle-${resourceARN}`}
        isConnectable={false}
        hidden={nodeProps.selected}
      />
    </div>
  );
}

export default ResourceNode;
