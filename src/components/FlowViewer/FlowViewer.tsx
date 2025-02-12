import { DataRecord } from '@api';
import {
  addEdge,
  Background,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import {
  RESOURCE_NODE_UTILS,
  SUBNET_NODE_UTILS,
  VPC_NODE_UTILS,
} from '../nodes';
import { customNodeTypes } from './FlowViewer.utils';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';

function FlowViewer({ dataRecords }: { dataRecords: Array<DataRecord> }) {
  const vpcNodes = VPC_NODE_UTILS.computeReactFlowNodes(dataRecords);
  const subnetNodes = SUBNET_NODE_UTILS.computeReactFlowNodes(dataRecords);
  const resourceNodes = RESOURCE_NODE_UTILS.computeReactFlowNodes(dataRecords);

  const allNodes = useMemo(
    () => [...vpcNodes, ...subnetNodes, ...resourceNodes],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const allEdges = useMemo(() => [], []);

  const [nodesState, _setNodesState, onNodesChange] = useNodesState(allNodes);
  const [edgesState, setEdgesState, onEdgesChange] = useEdgesState(allEdges);
  const onConnect: OnConnect = useCallback(
    (params) => setEdgesState((edges) => addEdge(params, edges)),
    [setEdgesState],
  );

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      nodeTypes={customNodeTypes}
      fitView
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
    </ReactFlow>
  );
}

export default FlowViewer;
