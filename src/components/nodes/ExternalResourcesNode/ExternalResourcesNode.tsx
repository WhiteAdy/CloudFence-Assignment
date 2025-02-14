import './ExternalResourcesNode.styles.scss';

import {
  ExternalResourceNodeComponentProps,
  ExternalResourcesGroupComponentProps,
} from './ExternalResourcesNode.types';

function ExternalResourcesGroup({
  portNumber,
  assets,
  cidr,
}: ExternalResourcesGroupComponentProps) {
  return (
    <div className="ExternalResourcesNode_Group">
      <div className="ExternalResourcesNode_Group_portNumber">{portNumber}</div>
      {assets?.map((asset, index) => {
        const assetEntries = Object.entries(asset);

        return (
          <div
            key={`ExternalResourcesNode_Group_assetInfo-${portNumber}-${asset}-${index}`}
            className="ExternalResourcesNode_Group_assetInfo"
          >
            {assetEntries.map(([key, value]) => (
              <div
                key={`ExternalResourcesNode_Group_assetInfo-${portNumber}-${key}-${index}`}
                className="ExternalResourcesNode_Group_assetInfo_entry"
              >
                <span>{key}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        );
      })}
      {cidr && (
        <div className="ExternalResourcesNode_Group_assetInfo">
          {Object.entries(cidr).map(([key, value], index) => (
            <div
              key={`ExternalResourcesNode_Group_assetInfo-${portNumber}-${key}-${index}`}
              className="ExternalResourcesNode_Group_assetInfo_entry"
            >
              <span>{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExternalResourcesNode({
  data: { allOutboundPortsEntries, allInboundPortsEntries, record },
}: ExternalResourceNodeComponentProps) {
  // We reverse them to prevent edges from intersecting
  const allEntriesReversed = [
    ...allOutboundPortsEntries,
    ...allInboundPortsEntries,
  ].toReversed();

  const numOfColumns = allEntriesReversed.length;

  return (
    <div
      className="ExternalResourcesNode"
      style={{
        gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
      }}
    >
      {allEntriesReversed.map(([portNumber, { assets, cidr }], index) => {
        return (
          <ExternalResourcesGroup
            key={`ExternalResourcesNode-${portNumber}-${index}`}
            portNumber={portNumber}
            assets={assets}
            cidr={cidr}
          />
        );
      })}
    </div>
  );
}

export default ExternalResourcesNode;
