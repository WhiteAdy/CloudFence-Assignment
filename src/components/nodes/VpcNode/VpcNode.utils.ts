import { DataRecord } from '@api';
import { SUBNET_NODE_UTILS } from '../SubnetNode/SubnetNode.utils';

const VPC_NODE_UTILS = {
  PADDING: 150,
  GAP: 150,
  getRecordsForVpcId: (allRecords: Array<DataRecord>, vpcId: string) => {
    return allRecords.filter((record) => record.vpcId === vpcId);
  },
  computeWidth: (allRecords: Array<DataRecord>) => {
    const subnets = Object.groupBy(allRecords, (record) => record.subnetId);

    return (
      Object.keys(subnets).length * SUBNET_NODE_UTILS.WIDTH +
      (Object.keys(subnets).length - 1) * VPC_NODE_UTILS.GAP +
      VPC_NODE_UTILS.PADDING * 2
    );
  },
  computeHeight: (allRecords: Array<DataRecord>) => {
    const subnets = Object.groupBy(allRecords, (record) => record.subnetId);

    const heighestCountOfResourcesForASubnet = Math.max(
      ...Object.values(subnets).map((subnet) => subnet!.length),
    );

    return (
      SUBNET_NODE_UTILS.computeHeight(heighestCountOfResourcesForASubnet) +
      VPC_NODE_UTILS.PADDING * 2
    );
  },
};

export { VPC_NODE_UTILS };
