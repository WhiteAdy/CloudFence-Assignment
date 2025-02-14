import { DataRecord } from '@api';
import { CustomNodeData, NodeType } from '../nodes.types';
import { RESOURCE_NODE_UTILS, SUBNET_NODE_UTILS } from '@components';
import { Node } from '@xyflow/react';

const WIDTH = 50;
const HEIGHT = 50;

const INVISIBLE_CONNECTION_NODE_UTILS = {
  WIDTH,
  HEIGHT,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    // const resourceRecordsGrouped = Object.groupBy(
    //   allRecords,
    //   (record) => record.resourceARN,
    // );
    // const networkInterfaceNodeEntries = Object.entries(
    //   resourceRecordsGrouped,
    // ).map(([resourceARN, records]) =>
    //   records!.map((record, index) => {
    //     return {
    //       type: NodeType.NETWORK_INTERFACE,
    //       id: record.networkInterfaceId,
    //       data: { record, allRecords },
    //       parentId: resourceARN,
    //       position: {
    //         x: RESOURCE_NODE_UTILS.WIDTH + SUBNET_NODE_UTILS.PADDING,
    //         y:
    //           index * (NETWORK_INTERFACE_NODE_UTILS.HEIGHT + GAP_BETWEEN_NODES),
    //       },
    //       draggable: false,
    //     };
    //   }),
    // );
    // return networkInterfaceNodeEntries.flat();
  },
};

export { INVISIBLE_CONNECTION_NODE_UTILS };
