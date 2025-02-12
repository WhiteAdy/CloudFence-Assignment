import { DataRecord } from '@api';
import { CustomNodeProps, NodeType } from '../nodes.types';
import { NETWORK_INTERFACE_NODE_UTILS, SUBNET_NODE_UTILS } from '@components';

const getUniqueResourcesForASubnet = (
  allRecords: Array<DataRecord>,
  subnetId: string,
) => {
  const recordsForTheCurrentSubnet = allRecords.filter(
    (r) => r.subnetId === subnetId,
  );

  return recordsForTheCurrentSubnet.reduce<Array<DataRecord>>((acc, record) => {
    if (
      acc.some(
        (r) => r.subnetId === subnetId && r.resourceARN === record.resourceARN,
      )
    ) {
      return acc;
    }
    return [...acc, record];
  }, []);
};

const RESOURCE_NODE_UTILS = {
  WIDTH: 150,
  HEIGHT: 150,
  PADDING: 20,
  getUniqueResourcesForASubnet,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<CustomNodeProps> => {
    const subnetRecords = Object.groupBy(
      allRecords,
      (record) => record.subnetId,
    );
    const resourceNodeEntries = Object.entries(subnetRecords).map(
      ([subnetId, records]) =>
        getUniqueResourcesForASubnet(records!, subnetId).map(
          (record, index) => {
            return {
              type: NodeType.RESOURCE,
              id: record.resourceARN,
              data: { record, allRecords },
              parentId: subnetId,
              extent: 'parent' as const,
              position: {
                x:
                  (SUBNET_NODE_UTILS.WIDTH - RESOURCE_NODE_UTILS.WIDTH) / 2 -
                  NETWORK_INTERFACE_NODE_UTILS.WIDTH * 1.5,
                y:
                  SUBNET_NODE_UTILS.PADDING +
                  index * (RESOURCE_NODE_UTILS.HEIGHT + SUBNET_NODE_UTILS.GAP),
              },
              draggable: false,
              // selectable: false,
            };
          },
        ),
    );

    return resourceNodeEntries.flat();
  },
};

export { RESOURCE_NODE_UTILS };
