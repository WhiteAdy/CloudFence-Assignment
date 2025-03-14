import { DataRecord } from '@api';
import { Node, NodeProps } from '@xyflow/react';

enum NodeType {
  VPC = 'VPC',
  SUBNET = 'SUBNET',
  RESOURCE = 'RESOURCE',
  NETWORK_INTERFACE = 'NETWORK_INTERFACE',
  PORTS = 'PORTS',
  EXTERNAL_RESOURCES = 'EXTERNAL_RESOURCES',
  INVISIBLE_CONNECTION = 'INVISIBLE_CONNECTION',
}

interface CustomNodeData extends Record<string, unknown> {
  record: DataRecord;
  allRecords: Array<DataRecord>;
}

type CustomNodeComponentProps = NodeProps<Node<CustomNodeData>>;

export { NodeType };
export type { CustomNodeData, CustomNodeComponentProps };
