import {
  NetworkInterfaceNode,
  NodeType,
  ResourceNode,
  SubnetNode,
  VpcNode,
} from '@components';
import { ComponentType } from 'react';

const customNodeTypes: Record<NodeType, ComponentType<any>> = {
  [NodeType.VPC]: VpcNode,
  [NodeType.SUBNET]: SubnetNode,
  [NodeType.RESOURCE]: ResourceNode,
  [NodeType.NETWORK_INTERFACE]: NetworkInterfaceNode,
};

export { customNodeTypes };
