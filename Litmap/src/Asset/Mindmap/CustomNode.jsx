import { Handle, NodeResizer, Position, useConnection } from "@xyflow/react";
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
    width: 100%;
    height: 100px;
    border: 1px solid #fff;
    top: 10;
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
  const connection = useConnection();

  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const { read } = ReadStore();

  console.log(data);

  return (
    <NodeStyle className="customNode">
      {!read && <NodeResizer color="blue" isVisible={selected} />}
      <div
        className="customNodeBody"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {!connection.inProgress && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            style={
              read
                ? { width: 0, height: 0 }
                : {
                    transform: "translateY(-50%)",
                    backgroundColor: "blue",
                    width: "100%",
                    left: "0px",
                  }
            }
          />
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <NodeImg src={data.imageUrl || basicImg} alt="Cast Img" />
        </div>
        {(!connection.inProgress || isTarget) && (
          <Handle
            className="customHandle"
            position={Position.Left}
            type="target"
            isConnectableStart={false}
            style={
              read
                ? { width: 0, height: 0 }
                : {
                    transform: "translateY(-50%)",
                    backgroundColor: "red",
                    width: "100%",
                    left: 0,
                  }
            }
          />
        )}
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
