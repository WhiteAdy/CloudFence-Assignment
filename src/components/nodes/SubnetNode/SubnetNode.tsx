import { CustomNodeProps } from '../nodes.types';
import './SubnetNode.styles.scss';
import { SUBNET_NODE_UTILS } from './SubnetNode.utils';

function SubnetNode({
  data: {
    record: { subnetId },
    allRecords,
  },
}: CustomNodeProps) {
  return (
    <div
      className="SubnetNode"
      style={{
        width: SUBNET_NODE_UTILS.WIDTH,
        height: SUBNET_NODE_UTILS.computeHeight(
          SUBNET_NODE_UTILS.getRecordsForSubnetId(allRecords, subnetId).length,
        ),
      }}
    >
      <span className="SubnetNode_vpcId">{subnetId}</span>
    </div>
  );
}

export default SubnetNode;
