import { DataRecord } from '@api';
import {
  ExternalResourcesNode,
  NetworkInterfaceNode,
  NodeType,
  PortsNode,
  ResourceNode,
  SubnetNode,
  VpcNode,
} from '@components';
import { Edge } from '@xyflow/react';
import { ComponentType } from 'react';

const customNodeTypes: Record<NodeType, ComponentType<any>> = {
  [NodeType.VPC]: VpcNode,
  [NodeType.SUBNET]: SubnetNode,
  [NodeType.RESOURCE]: ResourceNode,
  [NodeType.NETWORK_INTERFACE]: NetworkInterfaceNode,
  [NodeType.PORTS]: PortsNode,
  [NodeType.EXTERNAL_RESOURCES]: ExternalResourcesNode,
};

const computeReactFlowEdges = (allRecords: Array<DataRecord>): Array<Edge> => {
  return allRecords.map(({ networkInterfaceId, resourceARN }) => ({
    id: `${networkInterfaceId}-${resourceARN}`,
    source: networkInterfaceId,
    target: resourceARN,
    targetHandle: `handle-${resourceARN}`,
    sourceHandle: `handle-${networkInterfaceId}`,
    style: { zIndex: 123 },
    focusable: false,
  }));
};

export { customNodeTypes, computeReactFlowEdges };
