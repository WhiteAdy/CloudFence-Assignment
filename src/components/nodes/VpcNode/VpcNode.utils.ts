import { DataRecord } from '@api';
import { SUBNET_NODE_UTILS } from '../SubnetNode/SubnetNode.utils';
import { CustomNodeData, NodeType } from '../nodes.types';
import { RESOURCE_NODE_UTILS } from '../ResourceNode/ResourceNode.utils';
import { Node } from '@xyflow/react';

const computeVpcNodeWidth = (allRecords: Array<DataRecord>) => {
  const subnets = Object.groupBy(allRecords, (record) => record.subnetId);

  return (
    Object.keys(subnets).length * SUBNET_NODE_UTILS.WIDTH +
    (Object.keys(subnets).length - 1) * VPC_NODE_UTILS.GAP +
    VPC_NODE_UTILS.PADDING * 2
  );
};

const VPC_NODE_UTILS = {
  PADDING: 150,
  GAP: 150,
  getRecordsForVpcId: (allRecords: Array<DataRecord>, vpcId: string) => {
    return allRecords.filter((record) => record.vpcId === vpcId);
  },
  computeWidth: computeVpcNodeWidth,
  computeHeight: (allRecords: Array<DataRecord>) => {
    const subnets = Object.groupBy(allRecords, (record) => record.subnetId);
    const groupedUniqueResourcesPerSubnet = Object.entries(subnets).map(
      ([subnetId, records]) =>
        RESOURCE_NODE_UTILS.getUniqueResourcesForASubnet(records!, subnetId),
    );

    const heighestCountOfResourcesForASubnet = Math.max(
      ...groupedUniqueResourcesPerSubnet.map((subnet) => subnet!.length),
    );

    return (
      SUBNET_NODE_UTILS.computeHeight(heighestCountOfResourcesForASubnet) +
      VPC_NODE_UTILS.PADDING * 2
    );
  },
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    const vpcRecords = Object.groupBy(allRecords, (record) => record.vpcId);

    return Object.entries(vpcRecords).map(
      ([vpcId, recordsForTheCurrentVpc], index) => ({
        type: NodeType.VPC,
        id: vpcId,
        data: { record: recordsForTheCurrentVpc!.at(0)!, allRecords },
        position: {
          x: index * computeVpcNodeWidth(allRecords) + VPC_NODE_UTILS.PADDING,
          y: 0,
        },
        draggable: false,
        selectable: false,
        deletable: false,
      }),
    );
  },
};

export { VPC_NODE_UTILS };
