import './PortsNode.styles.scss';
import { CustomNodeComponentProps } from '../nodes.types';
import { PORTS_NODE_UTILS } from './PortsNode.utils';
import { ArrowRightIcon } from '@components';
import { Handle, Position } from '@xyflow/react';

function PortsNode({ data: { record } }: CustomNodeComponentProps) {
  const privateInboundTcpPortsEntries = Object.entries(
    record.baseline.PRIVATE_INBOUND.ports.TCP,
  );
  const privateInboundUdpPortsEntries = Object.entries(
    record.baseline.PRIVATE_INBOUND.ports.UDP,
  );
  const privateOutboundTcpPortsEntries = Object.entries(
    record.baseline.PRIVATE_OUTBOUND.ports.TCP,
  );
  const privateOutboundUdpPortsEntries = Object.entries(
    record.baseline.PRIVATE_OUTBOUND.ports.UDP,
  );

  const allOutboundPortsEntries = [
    ...privateOutboundTcpPortsEntries,
    ...privateOutboundUdpPortsEntries,
  ];
  const allInboundPortsEntries = [
    ...privateInboundTcpPortsEntries,
    ...privateInboundUdpPortsEntries,
  ];

  return (
    <div
      className="PortsNode"
      style={{
        width: PORTS_NODE_UTILS.WIDTH,
        height: PORTS_NODE_UTILS.HEIGHT,
      }}
    >
      <div className="PortsNode_outbound">
        <div className="PortsNode_outbound_title">
          <ArrowRightIcon />
          <span>Outbound</span>
          {allOutboundPortsEntries.length < 1 && (
            <span className="PortsNode_outbound_title_empty">(no ports)</span>
          )}
        </div>
        <div className="PortsNode_outbound_handles">
          {allOutboundPortsEntries.map(([portNumber]) => {
            const id = `${record.networkInterfaceId}-outbound-${portNumber}`;
            return (
              <div
                key={id}
                className="PortsNode_outbound_handles_handleWithTitle"
              >
                <span className="PortsNode_outbound_handles_handleWithTitle_title">
                  {portNumber}
                </span>
                <Handle
                  type="source"
                  position={Position.Top}
                  id={id}
                  isConnectable={false}
                  title="asd"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="PortsNode_inbound">
        <div className="PortsNode_inbound_title">
          {allInboundPortsEntries.length < 1 && (
            <span className="PortsNode_inbound_title_empty">(no ports)</span>
          )}
          <span>Inbound</span>
          <ArrowRightIcon />
        </div>
        <div className="PortsNode_inbound_handles">
          {allInboundPortsEntries.map(([portNumber]) => {
            const id = `${record.networkInterfaceId}-inbound-${portNumber}`;
            return (
              <div
                key={id}
                className="PortsNode_inbound_handles_handleWithTitle"
              >
                <span className="PortsNode_inbound_handles_handleWithTitle_title">
                  {portNumber}
                </span>
                <Handle
                  type="source"
                  position={Position.Top}
                  id={id}
                  isConnectable={false}
                  title="asd"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PortsNode;
