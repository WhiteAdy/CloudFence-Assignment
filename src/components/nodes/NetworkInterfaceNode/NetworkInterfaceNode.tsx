import { DataRecord } from '@api';
import { Node } from '@xyflow/react';
import './NetworkInterfaceNode.styles.scss';
import { NETWORK_INTERFACE_NODE_UTILS } from './NetworkInterfaceNode.utils';

function NetworkInterfaceNode({
  data: { networkInterfaceId },
}: Node<DataRecord>) {
  return (
    <div
      className="NetworkInterfaceNode"
      style={{
        width: NETWORK_INTERFACE_NODE_UTILS.WIDTH,
        height: NETWORK_INTERFACE_NODE_UTILS.HEIGHT,
      }}
    >
      <span className="NetworkInterfaceNode_vpcId">{networkInterfaceId}</span>
    </div>
  );
}

export default NetworkInterfaceNode;
