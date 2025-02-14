import { DataRecord } from '@api';
import {
  ExternalResourcesNode,
  InvisibleConnectionNode,
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
  [NodeType.INVISIBLE_CONNECTION]: InvisibleConnectionNode,
};

const computeResourceToNetworkInterfaceEdges = (
  allRecords: Array<DataRecord>,
): Array<Edge> => {
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

const computeOutboundPortsNodeToInvisibleConnectionEdges = (
  allRecords: Array<DataRecord>,
): Array<Edge> => {
  const networkInterfaceRecords = Object.groupBy(
    allRecords,
    (record) => record.networkInterfaceId,
  );

  const networkInterfaceRecordsMapped = Object.entries(
    networkInterfaceRecords,
  ).map(
    ([
      networkInterfaceId,
      // @ts-expect-error typing
      [
        {
          baseline: { PRIVATE_OUTBOUND },
        },
      ],
    ]) => {
      const privateOutboundTcpPorts = Object.keys(PRIVATE_OUTBOUND.ports.TCP);
      const privateOutboundUdpPorts = Object.keys(PRIVATE_OUTBOUND.ports.UDP);

      const allOutboundPorts = [
        ...privateOutboundTcpPorts,
        ...privateOutboundUdpPorts,
      ];

      return {
        networkInterfaceId,
        allOutboundPorts,
      };
    },
  );

  const networkInterfaceRecordsMappedFiltered =
    networkInterfaceRecordsMapped.filter(
      ({ allOutboundPorts }) => allOutboundPorts.length > 0,
    );

  const portsMapped = networkInterfaceRecordsMappedFiltered.reduce(
    // @ts-expect-error typing
    (acc, { networkInterfaceId, allOutboundPorts }) => {
      return [
        ...acc,
        ...[
          ...allOutboundPorts.map((portNumber) => ({
            networkInterfaceId,
            portNumber,
          })),
        ],
      ];
    },
    [],
  );

  // @ts-expect-error typing
  return portsMapped.map(({ networkInterfaceId, portNumber }) => {
    const portsNodeId = `ports-${networkInterfaceId}`;
    const invisibleConnectionNodeId = `InvisibleConnectionNode-externalResourcesNode-${networkInterfaceId}`;
    const portsNodeHandleId = `${networkInterfaceId}-outbound-${portNumber}`;
    const edgeId = `${portsNodeHandleId}-${invisibleConnectionNodeId}`;

    return {
      id: edgeId,
      source: portsNodeId,
      target: invisibleConnectionNodeId,
      sourceHandle: portsNodeHandleId,
      style: { zIndex: 123 },
      focusable: false,
      animated: true,
    };
  });
};

const computeInboundPortsNodeToInvisibleConnectionEdges = (
  allRecords: Array<DataRecord>,
): Array<Edge> => {
  const networkInterfaceRecords = Object.groupBy(
    allRecords,
    (record) => record.networkInterfaceId,
  );

  const networkInterfaceRecordsMapped = Object.entries(
    networkInterfaceRecords,
  ).map(
    ([
      networkInterfaceId,
      [
        {
          baseline: { PRIVATE_INBOUND },
        },
      ],
    ]) => {
      const privateInboundTcpPorts = Object.keys(PRIVATE_INBOUND.ports.TCP);
      const privateInboundUdpPorts = Object.keys(PRIVATE_INBOUND.ports.UDP);

      const allInboundPorts = [
        ...privateInboundTcpPorts,
        ...privateInboundUdpPorts,
      ];

      return {
        networkInterfaceId,
        allInboundPorts,
      };
    },
  );

  const networkInterfaceRecordsMappedFiltered =
    networkInterfaceRecordsMapped.filter(
      ({ allInboundPorts }) => allInboundPorts.length > 0,
    );

  const portsMapped = networkInterfaceRecordsMappedFiltered.reduce(
    // @ts-expect-error typing
    (acc, { networkInterfaceId, allInboundPorts }) => {
      return [
        ...acc,
        ...[
          ...allInboundPorts.map((portNumber) => ({
            networkInterfaceId,
            portNumber,
          })),
        ],
      ];
    },
    [],
  );

  // @ts-expect-error typing
  return portsMapped.map(({ networkInterfaceId, portNumber }) => {
    const portsNodeId = `ports-${networkInterfaceId}`;
    const invisibleConnectionNodeId = `InvisibleConnectionNode-externalResourcesNode-${networkInterfaceId}`;
    const portsNodeHandleId = `${networkInterfaceId}-inbound-${portNumber}`;
    const edgeId = `${portsNodeHandleId}-${invisibleConnectionNodeId}`;

    return {
      id: edgeId,
      source: portsNodeId,
      target: invisibleConnectionNodeId,
      sourceHandle: portsNodeHandleId,
      style: { zIndex: 123, animationDirection: 'reverse' },
      focusable: false,
      animated: true,
    };
  });
};

const computeReactFlowEdges = (allRecords: Array<DataRecord>): Array<Edge> => {
  return [
    ...computeResourceToNetworkInterfaceEdges(allRecords),
    ...computeOutboundPortsNodeToInvisibleConnectionEdges(allRecords),
    ...computeInboundPortsNodeToInvisibleConnectionEdges(allRecords),
  ];
};

export { customNodeTypes, computeReactFlowEdges };
