import { DataRecord } from '@api';
import { Node, NodeProps } from '@xyflow/react';

enum NodeType {
  VPC = 'VPC',
  SUBNET = 'SUBNET',
  RESOURCE = 'RESOURCE',
  NETWORK_INTERFACE = 'NETWORK_INTERFACE',
}

type CustomNodeProps = NodeProps<
  Node<{
    record: DataRecord;
    allRecords: Array<DataRecord>;
  }>
>;

export { NodeType };
export type { CustomNodeProps };
