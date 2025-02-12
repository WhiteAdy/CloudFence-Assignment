import { DataRecord } from '@api';
import { Background, ReactFlow } from '@xyflow/react';
import {
  RESOURCE_NODE_UTILS,
  SUBNET_NODE_UTILS,
  VPC_NODE_UTILS,
} from '../nodes';
import { customNodeTypes } from './FlowViewer.utils';
import '@xyflow/react/dist/style.css';

function FlowViewer({ dataRecords }: { dataRecords: Array<DataRecord> }) {
  const vpcNodes = VPC_NODE_UTILS.computeReactFlowNodes(dataRecords);
  const subnetNodes = SUBNET_NODE_UTILS.computeReactFlowNodes(dataRecords);
  const resourceNodes = RESOURCE_NODE_UTILS.computeReactFlowNodes(dataRecords);

  const allNodes = [...vpcNodes, ...subnetNodes, ...resourceNodes];

  return (
    <ReactFlow nodes={allNodes} nodeTypes={customNodeTypes} fitView>
      <Background />
    </ReactFlow>
  );
}

export default FlowViewer;
