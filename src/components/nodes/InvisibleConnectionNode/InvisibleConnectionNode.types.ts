import { Node, NodeProps } from '@xyflow/react';

interface InvisibleConnectionNodeData extends Record<string, unknown> {
  sourceHandleId: string;
  targetHandleId: string;
}

type InvisibleConnectionNodeComponentProps = NodeProps<
  Node<InvisibleConnectionNodeData>
>;

export type {
  InvisibleConnectionNodeComponentProps,
  InvisibleConnectionNodeData,
};
