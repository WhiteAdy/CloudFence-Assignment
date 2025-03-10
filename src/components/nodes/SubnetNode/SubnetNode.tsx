import { CustomNodeComponentProps } from '../nodes.types';
import { RESOURCE_NODE_UTILS } from '../ResourceNode/ResourceNode.utils';
import './SubnetNode.styles.scss';
import { SUBNET_NODE_UTILS } from './SubnetNode.utils';

function SubnetNode({
  data: { record, allRecords },
}: CustomNodeComponentProps) {
  return (
    <div
      className="SubnetNode"
      style={{
        width: SUBNET_NODE_UTILS.WIDTH,
        height: SUBNET_NODE_UTILS.computeHeight(
          RESOURCE_NODE_UTILS.getUniqueResourcesForASubnet(
            allRecords,
            record.subnetId,
          ).length,
        ),
      }}
    >
      <span className="SubnetNode_subnetId">{record.subnetId}</span>
    </div>
  );
}

export default SubnetNode;
