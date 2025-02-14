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
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-1`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-2`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-3`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-4`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-5`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-6`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-7`}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${sourceHandleId}-8`}
      />
    </div>
  );
}

export default InvisibleConnectionNode;
