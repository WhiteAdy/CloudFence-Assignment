import './VPCNode.styles.scss';
import { CustomNodeComponentProps } from '../nodes.types';
import { VPC_NODE_UTILS } from './VpcNode.utils';

function VpcNode({ data: { record, allRecords } }: CustomNodeComponentProps) {
  return (
    <div
      className="VPCNode"
      style={{
        width: VPC_NODE_UTILS.computeWidth(allRecords),
        height: VPC_NODE_UTILS.computeHeight(allRecords),
      }}
    >
      <span className="VPCNode_vpcId">{record.vpcId}</span>
    </div>
  );
}

export default VpcNode;
