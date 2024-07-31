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
import DownloadImg from "../Share/DownloadImg";
import ModalBtn from "../Share/ModalBtn";
import { useStore } from "../store";

const Mapping = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99;
  & > div > div > div > div > div > .react-flow__node {
    width: 150px;
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
  top: 510%;
  right: 400%;
`;

const DeleteEdgesButton = styled(ControlButton)`
  position: absolute;
  top: 50%;
  right: 400%;
`;

const CustomMiniMap = styled(MiniMap)`
  margin-bottom: 7%;
`;

const Logo = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
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
    backgroundImg,
    setBackImg,
    workInfo,
    relationship,
  } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [backColor, setBackColor] = useState();
  const [backgroundImage, setBackgroundImg] = useState(backgroundImg);
  const { workInfos, read, backgroundColor } = useStore();

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
      const restoreFlow = async () => {
        const flow = data;
        if (flow) {
          const readNodes = flow.nodes;
          readNodes.forEach((element) => {
            element.data.read = true;
          });

          const restoredEdges = flow.edges.map((edge) => ({
            ...edge,
            data: {
              ...edge.data,
              text: edge.data.text || "", // 라벨 데이터 복원
            },
          }));
          setNodes(flow.nodes || []);
          setEdges(restoredEdges || []);
          setTimeout(() => setViewport(0.1), 0);
          if (flow.backgroundColor) {
            setBackColor(flow.backgroundColor);
          } else if (flow.backgroundImage) {
            setBackgroundImg(flow.backgroundImage);
          }
        }
      };
      restoreFlow();
    },
    [setNodes, setEdges, setBackImg, setBackColor, setViewport]
  );

  // 마인드맵 저장
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      flow.version = Number(work.defaultVersion);
      flow.work_id = work.title;
      flow.viewport = rfInstance.getViewport(); // FitView 설정
      flow.backgroundImage = backgroundImage;
      flow.backgroundColor = backColor;
      flow.nodes = nodes;
      flow.edges = edges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          text: edge.data.text, // 엣지의 텍스트 포함
        },
      }));
      const updateRelationship = { ...work, relationship: flow, version: 0.1 };

      setWork(updateRelationship);
    }
  }, [rfInstance, backgroundImage, backColor, nodes, edges, work, setWork]);

  // 이미지나 컬러가 업데이트 될 때 재렌더링
  useEffect(() => {
    setBackgroundImg(backgroundImg);
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
    console.log(read);
    createNodes();
  }, [count, createNodes]);

  useEffect(() => {
    const loadRelationship = () => {
      try {
        if (read) {
          onRestore(relationship);
          fitView(); // fitView 호출
        } else {
          onRestore(work.relationship);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadRelationship();
  }, [relationship, read, onRestore, fitView]);

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
        <Background
          id="1"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
            backgroundSize: backgroundImage ? "cover" : null,
            background: backgroundColor ? backgroundColor : null,
            //   "linear-gradient(135deg, rgba(35,185,168,1) 0%, rgba(2,0,36,1) 80%)",
          }}
          variant="none"
        />
        <CustomControls>
          <PreviewButton onClick={fitView}>미리보기</PreviewButton>
          {/* <DeleteEdgesButton onClick={deleteAllEdges}>
            선 삭제
          </DeleteEdgesButton> */}
        </CustomControls>
        {read ? null : <CustomMiniMap />}
        {/* <Logo src="/Logo.png"></Logo> */}
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
