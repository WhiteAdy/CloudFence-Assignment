import { Handle, Position, useReactFlow, useViewport } from '@xyflow/react';
import './ResourceNode.styles.scss';
import { RESOURCE_NODE_UTILS } from './ResourceNode.utils';
import { CustomNodeComponentProps } from '../nodes.types';
import clsx from 'clsx';
import { useCallback } from 'react';
import { ArrowRightIcon, NETWORK_INTERFACE_NODE_UTILS } from '@components';

function ResourceNode({
  data: { record, allRecords },
  ...nodeProps
}: CustomNodeComponentProps) {
  const { zoom } = useViewport();
  const { setCenter, getNode } = useReactFlow();
  const networkInterfacesForResource =
    RESOURCE_NODE_UTILS.getNetworkInterfacesForAResource(
      allRecords,
      record.resourceARN,
    );

  const onClickResource = useCallback(() => {
    setCenter(
      nodeProps.positionAbsoluteX + nodeProps.width! / 2,
      nodeProps.positionAbsoluteY + nodeProps.height! / 2,
      { zoom: 2.5, duration: 500 },
    );
  }, [nodeProps, setCenter]);

  const onClickViewNetworkInterface = (networkInterfaceId: string) => {
    const networkInterfaceNode = getNode(networkInterfaceId)!;
    setTimeout(() => {
      setCenter(
        nodeProps.positionAbsoluteX +
          networkInterfaceNode.position.x +
          NETWORK_INTERFACE_NODE_UTILS.WIDTH / 2,
        nodeProps.positionAbsoluteY +
          networkInterfaceNode.position.y +
          NETWORK_INTERFACE_NODE_UTILS.HEIGHT / 2,
        {
          zoom: 5,
          duration: 500,
        },
      );
    }, 50);
  };

  return (
    <button
      className={clsx('ResourceNode', { 'ResourceNode--isZoomed': zoom > 2 })}
      style={{
        width: RESOURCE_NODE_UTILS.WIDTH,
        height: RESOURCE_NODE_UTILS.HEIGHT,
        padding: RESOURCE_NODE_UTILS.PADDING,
      }}
      onClick={onClickResource}
      type="button"
    >
      <span
        className="ResourceNode_resourceName"
        style={{
          translate: RESOURCE_NODE_UTILS.computeResourceNameTranslate(zoom),
          scale: RESOURCE_NODE_UTILS.computeResourceNameScale(zoom),
        }}
      >
        {record.resourceName}
      </span>
      <span
        className="ResourceNode_resourceARN"
        style={{
          scale: RESOURCE_NODE_UTILS.computeResourceArnScaleOrOpacity(zoom),
          opacity: RESOURCE_NODE_UTILS.computeResourceArnScaleOrOpacity(zoom),
        }}
      >
        {record.resourceARN}
      </span>
      <div
        className="
      ResourceNode_details"
        style={{
          scale: RESOURCE_NODE_UTILS.computeResourceArnScaleOrOpacity(zoom),
          opacity: RESOURCE_NODE_UTILS.computeResourceArnScaleOrOpacity(zoom),
        }}
      >
        <span className="ResourceNode_details_left">Private IP:</span>
        <span className="ResourceNode_details_right">192.168.0.0</span>
        <span className="ResourceNode_details_left">Public IP:</span>
        <span className="ResourceNode_details_right">188.26.8.136</span>
        {networkInterfacesForResource?.map(({ networkInterfaceId }, index) => (
          <div
            key={`go-to-${networkInterfaceId}-${index}`}
            className="ResourceNode_details_bottom"
            onClick={() => onClickViewNetworkInterface(networkInterfaceId)}
          >
            View network interface <b>{networkInterfaceId}</b>
            <ArrowRightIcon />
          </div>
        ))}
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id={`handle-${record.resourceARN}`}
        isConnectable={false}
        hidden={nodeProps.selected}
      />
    </button>
  );
}

export default ResourceNode;
