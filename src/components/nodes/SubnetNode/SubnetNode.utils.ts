import { DataRecord } from '@api';
import { NETWORK_INTERFACE_NODE_UTILS, RESOURCE_NODE_UTILS } from '@components';

const SUBNET_NODE_UTILS = {
  WIDTH: RESOURCE_NODE_UTILS.WIDTH * 2 + NETWORK_INTERFACE_NODE_UTILS.WIDTH,
  PADDING: 75,
  GAP: 50,
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
};

export { SUBNET_NODE_UTILS };
