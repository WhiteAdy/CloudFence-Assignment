import { DataRecord } from '@api';
import { CustomNodeData, NodeType } from '../nodes.types';
import { Node } from '@xyflow/react';
import { NETWORK_INTERFACE_NODE_UTILS } from '../NetworkInterfaceNode/NetworkInterfaceNode.utils';
import { VPC_NODE_UTILS } from '@components';

const WIDTH = 50;
const HEIGHT = NETWORK_INTERFACE_NODE_UTILS.HEIGHT * 0.86;

const EXTERNAL_RESOURCES_NODE_UTILS = {
  WIDTH,
  HEIGHT,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    const networkInterfaceRecords = Object.groupBy(
      allRecords,
      (record) => record.networkInterfaceId,
    );

    const networkInterfaceRecordsMapped = Object.entries(
      networkInterfaceRecords,
    ).map(([networkInterfaceId, record]) => {
      const privateInboundTcpPortsEntries = Object.entries(
        record![0].baseline.PRIVATE_INBOUND.ports.TCP,
      );
      const privateInboundUdpPortsEntries = Object.entries(
        record![0].baseline.PRIVATE_INBOUND.ports.UDP,
      );
      const privateOutboundTcpPortsEntries = Object.entries(
        record![0].baseline.PRIVATE_OUTBOUND.ports.TCP,
      );
      const privateOutboundUdpPortsEntries = Object.entries(
        record![0].baseline.PRIVATE_OUTBOUND.ports.UDP,
      );

      const allOutboundPortsEntries = [
        ...privateOutboundTcpPortsEntries,
        ...privateOutboundUdpPortsEntries,
      ];
      const allInboundPortsEntries = [
        ...privateInboundTcpPortsEntries,
        ...privateInboundUdpPortsEntries,
      ];

      return {
        networkInterfaceId,
        allOutboundPortsEntries,
        allInboundPortsEntries,
      };
    });

    return networkInterfaceRecordsMapped
      .filter(
        ({ allOutboundPortsEntries, allInboundPortsEntries }) =>
          [...allOutboundPortsEntries, ...allInboundPortsEntries].length > 0,
      )
      .map(
        ({
          networkInterfaceId,
          allOutboundPortsEntries,
          allInboundPortsEntries,
        }) => {
          return {
            type: NodeType.EXTERNAL_RESOURCES,
            id: `external-resources-${networkInterfaceId}`,
            data: {
              allOutboundPortsEntries,
              allInboundPortsEntries,
              record: networkInterfaceRecords[networkInterfaceId]!.at(0)!,
              allRecords,
            },
            parentId: networkInterfaceId,
            position: {
              x: VPC_NODE_UTILS.computeWidth(allRecords) / 6,
              y: VPC_NODE_UTILS.computeHeight(allRecords),
            },
            deletable: false,
            draggable: false,
          };
        },
      );
  },
};

export { EXTERNAL_RESOURCES_NODE_UTILS };
