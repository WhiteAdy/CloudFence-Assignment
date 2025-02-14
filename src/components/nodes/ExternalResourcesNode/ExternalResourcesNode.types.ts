import { Asset, CidrStuff, RoutingAddress } from '@api';
import { Node, NodeProps } from '@xyflow/react';
import { CustomNodeData } from '../nodes.types';

interface ExternalResourcesGroupComponentProps {
  portNumber: string;
  assets?: Array<Asset | CidrStuff | RoutingAddress>;
  cidr?: RoutingAddress;
}

type ExternalResourceNodeComponentProps = NodeProps<
  Node<
    CustomNodeData & {
      allOutboundPortsEntries: Array<
        [
          string,
          {
            assets?: Array<Asset | CidrStuff | RoutingAddress>;
            cidr?: RoutingAddress;
          },
        ]
      >;
      allInboundPortsEntries: Array<
        [
          string,
          {
            assets?: Array<Asset | CidrStuff | RoutingAddress>;
            cidr?: RoutingAddress;
          },
        ]
      >;
    }
  >
>;

export type {
  ExternalResourcesGroupComponentProps,
  ExternalResourceNodeComponentProps,
};
