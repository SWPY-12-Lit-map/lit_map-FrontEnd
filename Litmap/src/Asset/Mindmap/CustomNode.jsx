import { Handle, NodeResizer, Position, useStore } from "reactflow";
const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default function CustomNode({ id, data, selected, index }) {
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
      <div className="customNodeBody" style={{ width: "100%", height: "100%" }}>
        {!isConnecting && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
          />
        )}
        <div>
          <h3>{data.name}</h3>
          {/* <p>{data.id}</p> */}
          <p>{data.gender}</p>
          <p>{data.species}</p>
          <p>{data.age}</p>
          <p>{data.personality}</p>
          <p>{data.otherInfo}</p>
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
