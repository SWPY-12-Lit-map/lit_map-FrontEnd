import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  MiniMap,
  Controls,
  useReactFlow,
} from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";
import "reactflow/dist/style.css";
import "./style.css";
import styled from "styled-components";
import ModalBtn from "../Share/ModalBtn";

const Mapping = styled.div`
  width: 100%;
  height: 100%;
`;

const initialNodes = []; // 초기 노드
const initialEdges = []; // 초기 연결 선
const connectionLineStyle = {
  strokeWidth: 3,
  stroke: "black",
};
const nodeTypes = {
  custom: CustomNode,
}; // 노드 스타일
const edgeTypes = {
  floating: FloatingEdge,
}; // 선 타입
const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};
const defaultViewport = { x: 0, y: 0, zoom: 0 };

const flowKey = "flow-data";

const Mindmap = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);

  const edgeType = props.edgeType;
  const lineStyle = props.lineStyle;
  const infos = props.infos;
  const count = props.count;
  const work = props.work;

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  // 노드 생성
  const createNodes = useCallback(() => {
    const newNodes = [...Array(parseInt(count))].map((_, i) => ({
      id: `${i}`,
      type: "custom",
      position: { x: (i + 5) * 100, y: (i + 5) * 100 },
      data: infos[i],
    }));
    setNodes((nodes) => [...nodes, ...newNodes]);
  }, [count, setNodes, infos]);

  /* 연결 되었을 때 */
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

  /* 선 삭제 */
  const onEdgesDelete = useCallback(
    (edgesToRemove) => {
      setEdges((eds) => eds.filter((edge) => !edgesToRemove.includes(edge)));
    },
    [setEdges]
  );

  /* 선 클릭 */
  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdgeId(edge.id);
    console.log(edgeType);
  }, []);

  /* 마인드맵 저장 */
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      flow.version = Number(work.defaultVersion);
      flow.work_id = work.title;
      flow.viewport = {
        x: -333.1668897911595,
        y: -317.6406465385852,
        zoom: 1.1215817241569601,
      };
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(flow);
    }
  }, [rfInstance]);

  /* 마인드맵 저장 복구 */
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  /* 선 지우기 */
  useEffect(() => {
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
  }, [selectedEdgeId, createNodes, setEdges]);

  // 컴포넌트 로드 시 노드 생성
  useEffect(() => {
    createNodes();
  }, [count]);

  return (
    <Mapping>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((edge) => ({
          ...edge,
          data: {
            ...edge.data,
            onTextChange,
            edgeType,
            lineStyle,
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
        onInit={setRfInstance}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
      <button onClick={onSave}>Save</button>
      <button onClick={onRestore}>restore</button>
    </Mapping>
  );
};

export default Mindmap;
