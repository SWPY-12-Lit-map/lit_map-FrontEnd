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
  ControlButton,
} from "reactflow";
import CustomNode from "./CustomNode";
import FloatingEdge from "./FloatingEdge";
import CustomConnectionLine from "./CustomConnectionLine";
import "reactflow/dist/style.css";
import "./style.css";
import styled from "styled-components";
import ModalBtn from "../Share/ModalBtn";
import { ReadStore, useStore } from "../store";

const Mapping = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99;
  & > div > div > div > div > div > .react-flow__node {
    width: 150px;
    height: 200px;
    background-color: white;
    & > div > .customNodeBody {
      border: unset;
      border-radius: 0px;
    }
  }
`;
const Btns = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;
const CustomControls = styled(Controls)`
  position: absolute;
  top: 10%;
  left: 90% !important;
  width: 40px;
  height: 100px;
  border: none;
  background-color: unset;
  box-shadow: unset;
  & > button {
    margin: 5px 0;
    width: 100%;
    height: 40%;
    background-color: #dadada;
    border: none;
    padding: 0;
    & > svg {
      max-width: 20px;
      min-width: 20px;
      max-height: 20px;
    }
  }
  & > .react-flow__controls-zoomin {
    border-radius: 10px 10px 0 0;
  }
  & > .react-flow__controls-zoomout {
    border-radius: 0 0 10px 10px;
  }
  & > .react-flow__controls-fitview {
    display: none;
  }
  & > .react-flow__controls-interactive {
    display: none;
  }
`;

const PreviewButton = styled(ControlButton)`
  position: absolute;
  width: 100px !important;
  border-radius: 5px;
  top: 510%;
  right: 420%;
  background-color: unset !important;
  color: #8b0024;
  border: 1px solid #8b0024 !important;
`;

const DeleteEdgesButton = styled(ControlButton)`
  position: absolute;
  top: 50%;
  right: 400%;
`;

const CustomMiniMap = styled(MiniMap)`
  margin-bottom: 7%;
`;

const CustomBackground = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-color: ${(props) => props.backgroundColor || "transparent"};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const PreviewCard = styled.div`
  position: fixed;
  width: 50vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: white;
  z-index: 100; /* Ensure it's above other elements */
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
  const {
    edgeType,
    lineStyle,
    characterInfos,
    count,
    work,
    setWork,
    setBackImg,
    workInfo,
    relationship,
  } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [backColor, setBackColor] = useState("");
  const { workInfos, backgroundColor, backgroundImg, condition } = useStore();
  const { read, setRead } = ReadStore();
  const [backgroundImage, setBackgroundImg] = useState("");

  const [rfInstance, setRfInstance] = useState(null);
  const { fitView, setViewport } = useReactFlow();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 노드 생성
  const createNodes = useCallback(() => {
    const newNodes = [...Array(parseInt(count))].map((_, i) => ({
      id: `${i}`,
      type: "custom",
      position: {
        x: (i % 5) * 100,
        y: Math.floor(i / 5) * 100,
      },

      data: {
        ...characterInfos[i],
      },
    }));
    setNodes(() => [...newNodes]);
  }, [count, setNodes, work.casts]);

  /* 연결 되었을 때 */
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({ ...params, data: { text: "" } }, eds)),
    [setEdges]
  );

  const onTextChange = useCallback(
    (id, text) => {
      console.log("Updating edge with id", id, "to text", text);
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

  // 마인드맵 저장 복구
  const onRestore = useCallback(
    (data) => {
      console.log("복구");
      const restoreFlow = async () => {
        const flow = data;
        if (flow) {
          const readNodes = flow.nodes.map((node, i) => ({
            ...node,
            data: {
              ...workInfos.versions.casts[i],
              read: true,
            },
          }));

          const restoredEdges = flow.edges.map((edge) => ({
            ...edge,
            data: {
              ...edge.data,
              text: edge.data.text || "", // 라벨 데이터 복원
            },
          }));
          setNodes(readNodes || []);
          console.log(nodes);
          setEdges(restoredEdges || []);
          setTimeout(() => {
            fitView(); // FitView 호출
            setViewport(0.1);
          }, 0);
          if (flow.backgroundColor) {
            setBackColor(flow.backgroundColor);
          } else if (flow.backgroundImage) {
            setBackgroundImg(flow.backgroundImage);
          }
        }
      };
      restoreFlow();
    },
    [setNodes, setEdges, setBackImg, setBackColor, setViewport, fitView]
  );

  // 마인드맵 저장
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      flow.version = Number(work.version);
      flow.work_id = work.title;
      flow.viewport = rfInstance.getViewport(); // FitView 설정
      flow.backgroundImage = backgroundImage;
      flow.backgroundColor = backgroundColor;
      flow.nodes = nodes;
      flow.edges = edges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          text: edge.data.text, // 엣지의 텍스트 포함
        },
      }));
      const updateRelationship = {
        ...work,
        relationship: flow,
      };

      setWork(updateRelationship);
    }
  }, [rfInstance, backgroundImage, backColor, nodes, edges, work, setWork]);

  // 이미지나 컬러가 업데이트 될 때 재렌더링
  useEffect(() => {
    setBackgroundImg(backgroundImg);
    console.log(backgroundImg);
  }, [setBackImg, backgroundImg]);

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
  }, [selectedEdgeId, setEdges]);

  // 컴포넌트 로드 시 노드 생성
  useEffect(() => {
    console.log(work);
    console.log("복구");
    createNodes();
  }, [count, createNodes, characterInfos]);

  // 가져오기 할때
  useEffect(() => {
    const loadRelationship = () => {
      console.log(condition);
      try {
        if (read) {
          onRestore(relationship);
        } else if (!condition) {
          onRestore(work.relationship);
          console.log(work.relationship);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadRelationship();
  }, [relationship, read, onRestore]);

  useEffect(() => {
    if (!read) {
      if (
        nodes.length > 0 ||
        edges.length > 0 ||
        backgroundImage ||
        backColor
      ) {
        onSave();
      }
    }
  }, [nodes, edges, backgroundImage, backColor, read, onSave]);

  const deleteAllEdges = () => {
    setEdges([]);
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중
  }

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
            read: edge.data.read,
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
        <CustomBackground
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
        />
        <CustomControls></CustomControls>
        {read ? null : <CustomMiniMap />}
      </ReactFlow>
      {!read ? null : (
        <Btns>
          <ModalBtn workInfo={workInfo} />
        </Btns>
      )}
    </Mapping>
  );
};

export default Mindmap;
