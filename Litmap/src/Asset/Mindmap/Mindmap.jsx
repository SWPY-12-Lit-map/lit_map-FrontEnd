import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  MiniMap,
  Controls,
  useReactFlow,
  Background,
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

const flowKey = "flow-data";

const Mindmap = (props) => {
  const {
    edgeType,
    lineStyle,
    read,
    characterInfos,
    count,
    work,
    setWork,
    backgroundImg,
    setBackImg,
    relationship,
  } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [backColor, setBackColor] = useState();
  const [backgroundImage, setBackgroundImg] = useState(backgroundImg);
  const [local, setLocal] = useState(localStorage.getItem("color"));

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  // 노드 생성
  const createNodes = useCallback(() => {
    const newNodes = [...Array(parseInt(count))].map((_, i) => ({
      id: `${i}`,
      type: "custom",
      position: { x: (i + 5) * 100, y: (i + 5) * 100 },
      data: {
        ...characterInfos[i],
      },
    }));
    setNodes((nodes) => [...nodes, ...newNodes]);
  }, [count, setNodes, characterInfos, read]);

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
  }, []);

  /* 마인드맵 저장 */
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      flow.version = Number(work.defaultVersion);
      flow.work_id = work.title;
      flow.viewport = {
        x: rfInstance.getViewport().x,
        y: rfInstance.getViewport().y,
        zoom: rfInstance.getViewport().zoom,
      };
      flow.backgroundImage = backgroundImg;
      flow.backgroundColor = localStorage.getItem("color")
        ? localStorage.getItem("color")
        : null;
      const updateRelationship = { ...work, relationship: flow, version: 0.1 };
      setWork(updateRelationship);
      console.log(work);
    }
  }, [rfInstance, work, backgroundImg, setWork]);

  /* 마인드맵 저장 복구 */
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = work.relationship;
      const readNodes = flow.nodes;
      readNodes.forEach((element) => {
        element.data.read = read;
      });
      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setTimeout(() => setViewport(0.1), 0);
        if (flow.backgroundColor) {
          setBackColor(flow.backgroundColor);
          console.log(backColor);
        } else if (flow.backgroundImage) {
          setBackgroundImg(flow.backgroundImage);
        } else {
        }
      }
    };
    restoreFlow();
  }, [
    work.relationship,
    read,
    setNodes,
    setViewport,
    setEdges,
    setBackImg,
    setBackColor,
  ]);

  // 이미지나 컬러가 업데이트 될 때 재렌더링
  useEffect(() => {
    setBackgroundImg(backgroundImg);
  }, [setBackImg, , backgroundImg]);

  useEffect(() => {
    const checkLocalStorage = () => {
      const color = localStorage.getItem("color");
      if (color !== backColor) {
        setBackColor(color);
      }
    };

    const intervalId = setInterval(checkLocalStorage, 100);
    return () => clearInterval(intervalId);
  }, [backColor]);
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
  }, [count, createNodes, read, backgroundImg]);

  useEffect(() => {
    if (read == true) {
      onRestore();
      console.log(read);
    }
  }, [read, onRestore]);

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
            read,
          },
          selected: edge.id === selectedEdgeId,
        }))}
        onNodesChange={read ? null : onNodesChange}
        onEdgesChange={read ? null : onEdgesChange}
        onConnect={read ? null : onConnect}
        onEdgesDelete={read ? null : onEdgesDelete}
        onEdgeClick={read ? null : onEdgeClick}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
        onInit={setRfInstance}
      >
        <Background
          id="1"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
            backgroundSize: backgroundImage ? "cover" : null,
            background: backColor ? backColor : null,
            //   "linear-gradient(135deg, rgba(35,185,168,1) 0%, rgba(2,0,36,1) 80%)",
          }}
          variant="none"
        />
        <Controls />
        {read ? null : <MiniMap />}
      </ReactFlow>
      {read ? null : (
        <>
          <button onClick={onSave}>Save</button>
          <button onClick={onRestore}>restore</button>
        </>
      )}
    </Mapping>
  );
};

export default Mindmap;
