import { Handle, Position } from '@xyflow/react';
import './ResourceNode.styles.scss';
import { RESOURCE_NODE_UTILS } from './ResourceNode.utils';
import { CustomNodeProps } from '../nodes.types';

function ResourceNode({ data: { record }, ...nodeProps }: CustomNodeProps) {
  console.log('aici nodeProps.selected', nodeProps.selected);
  return (
    <div
      className="ResourceNode"
      style={{
        width: RESOURCE_NODE_UTILS.WIDTH,
        height: RESOURCE_NODE_UTILS.HEIGHT,
      }}
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
    </div>
  );
}

export default ResourceNode;
