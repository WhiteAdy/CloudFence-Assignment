interface DataRecord extends Record<string, unknown> {
  accountId: string;
  networkInterfaceId: string;
  resourceARN: string;
  resourceName: string;
  subnetId: string;
  version: number;
  vpcId: string;
  baseline: Baseline;
}
interface Data {
  metadata: {
    createdAt: string;
    id: string;
    private: boolean;
  };
  record: {
    data: Array<DataRecord>;
  };
}

interface Baseline {
  NETWORK_ACTIVITY: Record<string, NetworkActivity>;
  PRIVATE_INBOUND: Traffic;
  PRIVATE_OUTBOUND: Traffic;
  PUBLIC_INBOUND: Traffic;
  PUBLIC_OUTBOUND: Traffic;
}

interface Traffic {
  ports: {
    TCP: Port;
    UDP: Port;
  };
}

type Port =
  | Record<
      string,
      | {
          cidr?: RoutingAddress;
          subnedIds?: Array<unknown>;
          assets?: Array<Asset>;
          domains?: Array<string>;
        }
      | RoutingAddress
    >
  | EmptyObject;

interface RoutingAddress {
  addressIP: string | null;
  country: string | null;
  countryCode: string | null;
  hasLogo: boolean;
  organization: string | null;
}

interface Asset {
  addressIP?: string;
  resourceName?: string;
  resourceType?: string;
}

interface NetworkActivity {
  iUSeneratingReject: NetworkActivityValue;
  isConnectedToData: NetworkActivityValue;
  isConnectedToInternal: NetworkActivityValue;
  isConnectedToPublic: NetworkActivityValue;
  isConnectedToThreat: NetworkActivityValue;
  isInternalyExposed: NetworkActivityValue;
  isPortSensitiveExposed: NetworkActivityValue;
  isPubliclyExposed: NetworkActivityValue;
  isScanned: NetworkActivityValue;
  threatLevel: NetworkActivityValue;
}

type NetworkActivityValue =
  | boolean
  | 'restricted'
  | 'none'
  | 'full'
  | null
  | 'low'
  | 'medium'
  | 'high';

type NetworkActivityValueAsString =
  | 'true'
  | 'false'
  | 'restricted'
  | 'none'
  | 'full'
  | 'null'
  | 'low'
  | 'medium'
  | 'high';

type EmptyObject = Record<string, never>;

export type {
  Data,
  DataRecord,
  NetworkActivity,
  NetworkActivityValue,
  NetworkActivityValueAsString,
};
