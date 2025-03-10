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
  EXTERNAL_RESOURCES_NODE_UTILS,
  NETWORK_INTERFACE_NODE_UTILS,
  PORTS_NODE_UTILS,
  RESOURCE_NODE_UTILS,
  SUBNET_NODE_UTILS,
  VPC_NODE_UTILS,
} from '../nodes';
import { computeReactFlowEdges, customNodeTypes } from './FlowViewer.utils';
import '@xyflow/react/dist/style.css';
import { useCallback, useMemo } from 'react';
import { INVISIBLE_CONNECTION_NODE_UTILS } from '../nodes/InvisibleConnectionNode/InvisibleConnectionNode.utils';

function FlowViewer({ dataRecords }: { dataRecords: Array<DataRecord> }) {
  const computedNodesRecord = useMemo(
    () => ({
      vpcNodes: VPC_NODE_UTILS.computeReactFlowNodes(dataRecords),
      subnetNodes: SUBNET_NODE_UTILS.computeReactFlowNodes(dataRecords),
      resourceNodes: RESOURCE_NODE_UTILS.computeReactFlowNodes(dataRecords),
      networkInterfaceNodes:
        NETWORK_INTERFACE_NODE_UTILS.computeReactFlowNodes(dataRecords),
      portsNodes: PORTS_NODE_UTILS.computeReactFlowNodes(dataRecords),
      externalResourcesNodes:
        EXTERNAL_RESOURCES_NODE_UTILS.computeReactFlowNodes(dataRecords),
      invisibleConnectionNodes:
        INVISIBLE_CONNECTION_NODE_UTILS.computeReactFlowNodes(dataRecords),
    }),
    [dataRecords],
  );

  const allNodes = Object.values(computedNodesRecord).flat();

  const allEdges = useMemo(
    () => computeReactFlowEdges(dataRecords),
    [dataRecords],
  );

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
      minZoom={0.1}
      maxZoom={5.5}
      proOptions={{ hideAttribution: true }}
    >
      <Background />
    </ReactFlow>
  );
}

export default FlowViewer;
