import { DataRecord } from '@api';
import { NodeType } from '../nodes.types';
import { Node } from '@xyflow/react';
import { InvisibleConnectionNodeData } from './InvisibleConnectionNode.types';

const WIDTH = 50;
const HEIGHT = 50;

const INVISIBLE_CONNECTION_NODE_UTILS = {
  WIDTH,
  HEIGHT,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<InvisibleConnectionNodeData>> => {
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

    const networkInterfaceRecordsMappedFiltered =
      networkInterfaceRecordsMapped.filter(
        ({ allOutboundPortsEntries, allInboundPortsEntries }) =>
          [...allOutboundPortsEntries, ...allInboundPortsEntries].length > 0,
      );

    return networkInterfaceRecordsMappedFiltered.map(
      ({ networkInterfaceId }) => {
        const parentId = `externalResourcesNode-${networkInterfaceId}`;
        const id = `InvisibleConnectionNode-${parentId}`;
        return {
          type: NodeType.INVISIBLE_CONNECTION,
          id,
          parentId,
          data: {
            sourceHandleId: `${id}-sourceHandle`,
            targetHandleId: `${id}-targetHandle`,
          },
          position: {
            x: -65,
            y: -100,
          },
          deletable: false,
          draggable: false,
        };
      },
    );
  },
};

export { INVISIBLE_CONNECTION_NODE_UTILS };
