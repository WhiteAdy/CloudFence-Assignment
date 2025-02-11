import { DataRecord } from '@api';
import { Node } from '@xyflow/react';

type CustomNodeProps = Node<{
  record: DataRecord;
  allRecords: Array<DataRecord>;
}>;

export type { CustomNodeProps };
