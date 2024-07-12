import { Handle, NodeResizer, Position, useStore } from "reactflow";
import basicImg from "../blank-profile-picture-973460_1280.png";
import { useState } from "react";
import styled from "styled-components";

const connectionNodeIdSelector = (state) => state.connectionNodeId;
const Button = styled.button`
  position: absolute;
  left: 25px;
`;
const InfoTap = styled.div`
  position: absolute;
`;

export default function CustomNode({ id, data, selected, index }) {
  const [show, setShow] = useState(false);

  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isConnecting = !!connectionNodeId;
  const isTarget = connectionNodeId && connectionNodeId !== id;
  // const label = isTarget ? "Drop here" : "Drag to connect";
  return (
    <div className="customNode" style={{ width: "100%", height: "100%" }}>
      <NodeResizer
        color="blue"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
      />
      <div
        className="customNodeBody"
        style={{ width: "100%", height: "100%", overflow: "unset" }}
      >
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
          />
        )}
        <div>
          <Button
            onClick={() => {
              {
                show == false ? setShow(true) : setShow(false);
              }
            }}
          >
            다운
          </Button>
          <img src={data.imageUrl ? data.imageUrl : basicImg} width={100}></img>
          {show == false ? null : (
            <InfoTap>
              <p>이름: {data.name}</p>
              <p>종족: {data.type}</p>
              <p>주조연: {data.role}</p>
              <p>성별: {data.gender}</p>
              <p>나이: {data.age}</p>
              <p>mbti: {data.mbti}</p>
              <p>기타내용: {data.contents}</p>
            </InfoTap>
          )}
        </div>

        <Handle
          className="customHandle"
          position={Position.Left}
          type="target"
          isConnectableStart={false}
        />
      </div>
    </div>
  );
}
