import './NetworkInterfaceNode.styles.scss';
import { NETWORK_INTERFACE_NODE_UTILS } from './NetworkInterfaceNode.utils';
import { CustomNodeComponentProps } from '../nodes.types';
import { Handle, Position, useReactFlow, useViewport } from '@xyflow/react';
import { useCallback } from 'react';
import clsx from 'clsx';
import { NetworkActivity, NetworkActivityValueAsString } from '@api';
import { Badge } from '@components';

function NetworkInterfaceNode({
  data: { record },
  ...nodeProps
}: CustomNodeComponentProps) {
  const { zoom } = useViewport();
  const { setCenter } = useReactFlow();

  const onClickNetworkInterface = useCallback(() => {
    setCenter(
      nodeProps.positionAbsoluteX + nodeProps.width! / 2,
      nodeProps.positionAbsoluteY + nodeProps.height! / 2,
      { zoom: 5, duration: 500 },
    );
  }, [nodeProps, setCenter]);

  const currentIp = Object.keys(record.baseline.NETWORK_ACTIVITY)[0];
  const currentNetworkActivityEntries = Object.entries(
    record.baseline.NETWORK_ACTIVITY[currentIp],
  );

  return (
    <button
      className={clsx('NetworkInterfaceNode', {
        'NetworkInterfaceNode--isZoomed': zoom > 3,
      })}
      style={{
        width: NETWORK_INTERFACE_NODE_UTILS.WIDTH,
        height: NETWORK_INTERFACE_NODE_UTILS.HEIGHT,
      }}
      onClick={onClickNetworkInterface}
      type="button"
    >
      <span className="NetworkInterfaceNode_networkInterfaceId">
        {record.networkInterfaceId}
      </span>
      <div className="NetworkInterfaceNode_networkActivityTitle">
        <span>{currentIp}</span>
        <span>Network activity</span>
      </div>
      <div className="NetworkInterfaceNode_networkActivityValuesGrid">
        {currentNetworkActivityEntries.map(([key, value], index) => (
          <div
            key={`currentNetworkActivity-${currentIp}-${key}-${index}`}
            className="NetworkInterfaceNode_networkActivityValuesGrid_valuesItem"
          >
            <span>
              {NETWORK_INTERFACE_NODE_UTILS.NETWORK_ACTIVITY_KEYS_DICT[
                key as keyof NetworkActivity
              ] || key}
            </span>
            <Badge
              text={
                NETWORK_INTERFACE_NODE_UTILS.NETWORK_ACTIVITY_VALUES_DICT[
                  key as keyof NetworkActivity
                ].labels[String(value) as NetworkActivityValueAsString] || key
              }
              variant={
                NETWORK_INTERFACE_NODE_UTILS.NETWORK_ACTIVITY_VALUES_DICT[
                  key as keyof NetworkActivity
                ].badgeVariants[String(value) as NetworkActivityValueAsString]
              }
            />
          </div>
        ))}
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id={`handle-${record.networkInterfaceId}`}
        isConnectable={false}
        hidden={nodeProps.selected}
      />
    </button>
  );
}

export default NetworkInterfaceNode;
