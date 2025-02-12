import './NetworkInterfaceNode.styles.scss';
import { NETWORK_INTERFACE_NODE_UTILS } from './NetworkInterfaceNode.utils';
import { CustomNodeComponentProps } from '../nodes.types';
import { Handle, Position, useReactFlow, useViewport } from '@xyflow/react';
import { useCallback } from 'react';
import clsx from 'clsx';

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
      { zoom: 3.1, duration: 500 },
    );
  }, [nodeProps, setCenter]);

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
      <span className="NetworkInterfaceNode_vpcId">
        {record.networkInterfaceId}
      </span>
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
