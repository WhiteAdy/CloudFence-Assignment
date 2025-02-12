import { DataRecord } from '@api';
import {
  CustomNodeData,
  NETWORK_INTERFACE_NODE_UTILS,
  NodeType,
  RESOURCE_NODE_UTILS,
  VPC_NODE_UTILS,
} from '@components';
import { Node } from '@xyflow/react';

const GAP = 50;

const SUBNET_NODE_UTILS = {
  WIDTH:
    2 * (RESOURCE_NODE_UTILS.WIDTH + NETWORK_INTERFACE_NODE_UTILS.WIDTH) + GAP,
  PADDING: 75,
  GAP,
  getRecordsForSubnetId: (allRecords: Array<DataRecord>, subnetId: string) => {
    return allRecords.filter((record) => record.subnetId === subnetId);
  },
  computeHeight: (numOfResources: number) => {
    return (
      numOfResources * RESOURCE_NODE_UTILS.HEIGHT +
      (numOfResources - 1) * SUBNET_NODE_UTILS.GAP +
      SUBNET_NODE_UTILS.PADDING * 2
    );
  },
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    const subnetRecords = Object.groupBy(
      allRecords,
      (record) => record.subnetId,
    );

    return Object.entries(subnetRecords).map(
      ([subnetId, recordsForTheCurrentSubnet], index) => ({
        type: NodeType.SUBNET,
        id: subnetId,
        data: { record: recordsForTheCurrentSubnet!.at(0)!, allRecords },
        parentId: recordsForTheCurrentSubnet!.at(0)!.vpcId,
        extent: 'parent' as const,
        position: {
          x:
            index * (SUBNET_NODE_UTILS.WIDTH + VPC_NODE_UTILS.GAP) +
            VPC_NODE_UTILS.PADDING,
          y: VPC_NODE_UTILS.PADDING,
        },
        draggable: false,
        selectable: false,
        deletable: false,
      }),
    );
  },
};

export { SUBNET_NODE_UTILS };
