import './NetworkInterfaceNode.styles.scss';
import { NETWORK_INTERFACE_NODE_UTILS } from './NetworkInterfaceNode.utils';
import { CustomNodeProps } from '../nodes.types';
import { Handle, Position } from '@xyflow/react';

function NetworkInterfaceNode({
  data: { record },
  ...nodeProps
}: CustomNodeProps) {
  return (
    <div
      className="NetworkInterfaceNode"
      style={{
        width: NETWORK_INTERFACE_NODE_UTILS.WIDTH,
        height: NETWORK_INTERFACE_NODE_UTILS.HEIGHT,
      }}
    >
      <span className="NetworkInterfaceNode_vpcId">
        {record.networkInterfaceId}
      </span>
      <Handle
        type="source"
        position={Position.Left}
        id={`handle-${record.networkInterfaceId}`}
        isConnectable={false}
        hidden={nodeProps.selected}
      />
    </div>
  );
}

export default NetworkInterfaceNode;
