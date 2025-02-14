import { DataRecord } from '@api';
import { CustomNodeData, NodeType } from '../nodes.types';
import { Node } from '@xyflow/react';
import { NETWORK_INTERFACE_NODE_UTILS } from '../NetworkInterfaceNode/NetworkInterfaceNode.utils';

const WIDTH = 69;
const HEIGHT = NETWORK_INTERFACE_NODE_UTILS.HEIGHT * 0.86;

const PORTS_NODE_UTILS = {
  WIDTH,
  HEIGHT,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    const networkInterfaceRecords = Object.groupBy(
      allRecords,
      (record) => record.networkInterfaceId,
    );

    return Object.entries(networkInterfaceRecords).map(
      ([networkInterfaceId, recordsForTheCurrentNetworkInterface]) => ({
        type: NodeType.PORTS,
        id: `ports-${networkInterfaceId}`,
        data: {
          record: recordsForTheCurrentNetworkInterface!.at(0)!,
          allRecords,
        },
        parentId: networkInterfaceId,
        position: {
          x: NETWORK_INTERFACE_NODE_UTILS.WIDTH - WIDTH / 3,
          y: (NETWORK_INTERFACE_NODE_UTILS.HEIGHT - HEIGHT) / 2,
        },
        draggable: false,
        // selectable: false,
        deletable: false,
      }),
    );
  },
};

export { PORTS_NODE_UTILS };
