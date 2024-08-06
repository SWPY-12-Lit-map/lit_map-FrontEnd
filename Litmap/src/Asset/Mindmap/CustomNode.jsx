import { Handle, NodeResizer, Position } from "reactflow";
import basicImg from "../blank-profile-picture-973460_1280.png";
import { useState } from "react";
import styled from "styled-components";
import { ReadStore, useStore } from "../store";

const connectionNodeIdSelector = (state) => state.connectionNodeId;
const NodeStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: #e3e3e3;

  .customHandle {
    width: 10px;
    height: 10px;
    background: #555;
    border-radius: 50%;
    border: 1px solid #fff;
    left: 40%;
  }
`;
const InfoTab = styled.div`
  position: absolute;
  background-color: #e3e3e3;
  border-radius: 5px;
  width: 90%;
  bottom: 0%;
  font-size: 12px;
`;

const NodeName = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100%;
  border-radius: 5px;
  padding: 0 0 0 5px;
  background-color: white;
`;

const NodeImg = styled.img`
  padding: 5px;
  width: 100%;
  height: 60%;
  object-fit: contain;
`;

export default function CustomNode({ id, data, selected }) {
  const [show, setShow] = useState(false);
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const { read } = ReadStore();

  console.log(data);

  return (
    <NodeStyle className="customNode">
      {!read && <NodeResizer color="blue" isVisible={selected} />}
      <div className="customNodeBody" style={{ width: "100%", height: "100%" }}>
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={read ? null : { top: "50%", transform: "translateY(-50%)" }}
          />
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <NodeImg src={data.imageUrl || basicImg} alt="Cast Img" />
          {/* <NodeName
            onClick={() => {
              setShow(!show);
            }}
          >
            {data.name}
          </NodeName> */}
        </div>
        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
          style={read ? null : { top: "50%", transform: "translateY(-50%)" }}
        />
      </div>{" "}
      {/* {show && ( */}
      <InfoTab>
        <h5>
          이름: {data.name}
          {data.age ? `(${data.age}세)` : null}
        </h5>
        <p>{data.contents}</p>
        {/* <p>종족: {data.type}</p>
        <p>주조연: {data.role}</p> */}
        {/* <p>성별: {data.gender}</p> */}
        {/* <p>나이: {data.age}</p> */}
        {/* <p>mbti: {data.mbti}</p> */}
        {/* <p>기타내용: {data.contents}</p> */}
      </InfoTab>
      {/* // )} */}
    </NodeStyle>
  );
}
