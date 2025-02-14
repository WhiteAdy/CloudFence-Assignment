import { Handle, Position } from '@xyflow/react';
import './InvisibleConnectionNode.styles.scss';
import { InvisibleConnectionNodeComponentProps } from './InvisibleConnectionNode.types';

function InvisibleConnectionNode({
  data: { sourceHandleId, targetHandleId },
  ...nodeProps
}: InvisibleConnectionNodeComponentProps) {
  return (
    <div className="InvisibleConnectionNode">
      <Handle type="target" position={Position.Top} id={targetHandleId} />
      <Handle type="source" position={Position.Bottom} id={sourceHandleId} />
    </div>
  );
}

export default InvisibleConnectionNode;
