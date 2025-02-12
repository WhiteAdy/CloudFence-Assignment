import './NetworkInterfaceNode.styles.scss';
import { NETWORK_INTERFACE_NODE_UTILS } from './NetworkInterfaceNode.utils';
import { CustomNodeProps } from '../nodes.types';

function NetworkInterfaceNode({ data: { record } }: CustomNodeProps) {
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
    </div>
  );
}

export default NetworkInterfaceNode;
