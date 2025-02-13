import { DataRecord } from '@api';
import { CustomNodeData, NodeType } from '../nodes.types';
import { NETWORK_INTERFACE_NODE_UTILS, SUBNET_NODE_UTILS } from '@components';
import { Node } from '@xyflow/react';

const MIN_ZOOM_THRESHOLD = 0.7;
const MAX_ZOOM_THRESHOLD = 2;

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

const computeResourceNameTranslate = (zoom: number) => {
  if (zoom < MIN_ZOOM_THRESHOLD) {
    return '0 125px';
  } else if (zoom > MAX_ZOOM_THRESHOLD) {
    return '0 0px';
  }
  const scale =
    (zoom - MIN_ZOOM_THRESHOLD) / (MAX_ZOOM_THRESHOLD - MIN_ZOOM_THRESHOLD);
  const translateY = 125 * (1 - scale);
  return `0 ${translateY}px`;
};

const computeResourceNameScale = (zoom: number) => {
  if (zoom < MIN_ZOOM_THRESHOLD) {
    return 1.5;
  } else if (zoom > MAX_ZOOM_THRESHOLD) {
    return 1;
  }

  const scale =
    1.5 -
    ((zoom - MIN_ZOOM_THRESHOLD) / (MAX_ZOOM_THRESHOLD - MIN_ZOOM_THRESHOLD)) *
      0.5;

  return scale;
};

const computeResourceArnScaleOrOpacity = (zoom: number) => {
  if (zoom < MIN_ZOOM_THRESHOLD) {
    return 0;
  } else if (zoom > MAX_ZOOM_THRESHOLD) {
    return 1;
  }
  const scale =
    (zoom - MIN_ZOOM_THRESHOLD) / (MAX_ZOOM_THRESHOLD - MIN_ZOOM_THRESHOLD);

  return scale;
};

const getNetworkInterfacesForAResource = (
  allRecords: Array<DataRecord>,
  resourceARN: string,
) => Object.groupBy(allRecords, (record) => record.resourceARN)[resourceARN];

const RESOURCE_NODE_UTILS = {
  WIDTH: 300,
  HEIGHT: 300,
  PADDING: 20,
  MIN_ZOOM_THRESHOLD,
  MAX_ZOOM_THRESHOLD,
  getUniqueResourcesForASubnet,
  computeResourceNameTranslate,
  computeResourceNameScale,
  computeResourceArnScaleOrOpacity,
  getNetworkInterfacesForAResource,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
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
                  SUBNET_NODE_UTILS.WIDTH -
                  RESOURCE_NODE_UTILS.WIDTH -
                  NETWORK_INTERFACE_NODE_UTILS.WIDTH * 2.15,
                y:
                  SUBNET_NODE_UTILS.PADDING +
                  index * (RESOURCE_NODE_UTILS.HEIGHT + SUBNET_NODE_UTILS.GAP),
              },
              draggable: false,
            };
          },
        ),
    );

    return resourceNodeEntries.flat();
  },
};

export { RESOURCE_NODE_UTILS };
