import { Handle, NodeResizer, Position } from "reactflow";
import basicImg from "../blank-profile-picture-973460_1280.png";
import { useState } from "react";
import styled from "styled-components";
import { useStore } from "../store";

const connectionNodeIdSelector = (state) => state.connectionNodeId;
const InfoTab = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  top: 30%;
`;

const NodeName = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 50px;
  border-radius: 5px;
  padding: 0 0 0 5px;
  background-color: white;
`;

const NodeStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .customHandle {
    width: 10px;
    height: 10px;
    background: #555;
    border-radius: 50%;
    border: 1px solid #fff;
    left: 40%;
  }
`;

export default function CustomNode({ id, data, selected }) {
  const [show, setShow] = useState(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const { read } = useStore();

  return (
    <NodeStyle className="customNode">
      {!read && (
        <NodeResizer
          color="blue"
          isVisible={selected}
          minWidth={100}
          minHeight={100}
        />
      )}
      <div className="customNodeBody" style={{ width: "100%", height: "100%" }}>
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          />
        )}
        <div>
          <img src={data.imageUrl || basicImg} width={100} alt="Profile" />
          <NodeName
            onClick={() => {
              setShow(!show);
            }}
          >
            {data.name}
          </NodeName>
        </div>
        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      </div>{" "}
      {show && (
        <InfoTab>
          <p>이름: {data.name}</p>
          <p>종족: {data.type}</p>
          <p>주조연: {data.role}</p>
          <p>성별: {data.gender}</p>
          <p>나이: {data.age}</p>
          <p>mbti: {data.mbti}</p>
          <p>기타내용: {data.contents}</p>
        </InfoTab>
      )}
    </NodeStyle>
  );
}
