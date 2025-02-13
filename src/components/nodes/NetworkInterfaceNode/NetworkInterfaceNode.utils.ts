import {
  DataRecord,
  NetworkActivity,
  NetworkActivityValueAsString,
} from '@api';
import { CustomNodeData, NodeType } from '../nodes.types';
import {
  BadgeVariant,
  RESOURCE_NODE_UTILS,
  SUBNET_NODE_UTILS,
} from '@components';
import { Node } from '@xyflow/react';

const GAP_BETWEEN_NODES = 25;

const NETWORK_ACTIVITY_KEYS_DICT: Record<keyof NetworkActivity, string> = {
  threatLevel: 'Threat Level',
  isScanned: 'Scanned',
  isPubliclyExposed: 'Publicly Exposed',
  isInternalyExposed: 'Internally Exposed',
  isPortSensitiveExposed: 'Port Sensitive Exposed',
  isConnectedToPublic: 'Connected to Public',
  isConnectedToInternal: 'Connected to Internal',
  isConnectedToData: 'Connected to Data',
  isConnectedToThreat: 'Connected to Threat',
  iUSeneratingReject: 'Generating Reject',
};

const NETWORK_ACTIVITY_VALUES_DICT: Record<
  keyof NetworkActivity,
  {
    labels: Record<NetworkActivityValueAsString, string>;
    badgeVariants: Record<NetworkActivityValueAsString, BadgeVariant>;
  }
> = {
  threatLevel: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isScanned: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isPubliclyExposed: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isInternalyExposed: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isPortSensitiveExposed: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isConnectedToPublic: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isConnectedToInternal: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isConnectedToData: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  isConnectedToThreat: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
  iUSeneratingReject: {
    labels: {
      true: 'True',
      false: 'False',
      restricted: 'Restricted',
      none: 'None',
      full: 'Full',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      null: 'Unknown',
    },
    badgeVariants: {
      true: 'danger',
      false: 'success',
      restricted: 'warning',
      none: 'success',
      full: 'danger',
      low: 'success',
      medium: 'warning',
      high: 'danger',
      null: 'warning',
    },
  },
};

const NETWORK_INTERFACE_NODE_UTILS = {
  WIDTH: 150,
  HEIGHT: 150,
  GAP_BETWEEN_NODES,
  NETWORK_ACTIVITY_KEYS_DICT,
  NETWORK_ACTIVITY_VALUES_DICT,
  computeReactFlowNodes: (
    allRecords: Array<DataRecord>,
  ): Array<Node<CustomNodeData>> => {
    const resourceRecordsGrouped = Object.groupBy(
      allRecords,
      (record) => record.resourceARN,
    );

    const networkInterfaceNodeEntries = Object.entries(
      resourceRecordsGrouped,
    ).map(([resourceARN, records]) =>
      records!.map((record, index) => {
        return {
          type: NodeType.NETWORK_INTERFACE,
          id: record.networkInterfaceId,
          data: { record, allRecords },
          parentId: resourceARN,
          position: {
            x: RESOURCE_NODE_UTILS.WIDTH + SUBNET_NODE_UTILS.PADDING,
            y:
              index * (NETWORK_INTERFACE_NODE_UTILS.HEIGHT + GAP_BETWEEN_NODES),
          },
          draggable: false,
        };
      }),
    );

    return networkInterfaceNodeEntries.flat();
  },
};

export { NETWORK_INTERFACE_NODE_UTILS };
