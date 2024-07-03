import React, { useCallback, useState, useEffect } from "react";

import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  MiniMap,
  Controls,
} from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";

import "reactflow/dist/style.css";
import "./style.css";
import styled from "styled-components";

const Mapping = styled.div`
  width: 100%;
  height: 100%;
`;

const initialNodes = [];
const initialEdges = [];
const connectionLineStyle = {
  strokeWidth: 3,
  stroke: "black",
};
const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes = {
  floating: FloatingEdge,
};
const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};
const defaultViewport = { x: 0, y: 0, zoom: 0 };

const Mindmap = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const infos = props.infos;
  const count = props.count;
  const createNodes = useCallback(() => {
    const newNodes = [...Array(parseInt(count))].map((_, i) => ({
      id: `${i}`,
      type: "custom",
      position: { x: (i + 5) * 100, y: (i + 5) * 100 },
      data: infos[i],
    }));
    setNodes((nodes) => [...nodes, ...newNodes]);
  }, [count, setNodes]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, data: { text: "" } }, eds)),
    [setEdges]
  );

  const onTextChange = useCallback(
    (id, text) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === id ? { ...edge, data: { ...edge.data, text } } : edge
        )
      );
    },
    [setEdges]
  );

  const onEdgesDelete = useCallback(
    (edgesToRemove) => {
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.includes(edge)));
    },
    [setEdges]
  );

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdgeId(edge.id);
  }, []);

  useEffect(() => {
    createNodes();
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedEdgeId) {
        setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdgeId));
        setSelectedEdgeId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEdgeId]);

  return (
    <Mapping>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            onTextChange,
          },
          selected: edge.id === selectedEdgeId,
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onEdgeClick={onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Mapping>
  );
};

export default Mindmap;
