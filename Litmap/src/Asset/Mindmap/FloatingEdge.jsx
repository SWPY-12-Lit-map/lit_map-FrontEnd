import { useCallback, useState, useEffect } from "react";
import {
  useStore,
  getStraightPath,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { getEdgeParams } from "./util";
import { ReadStore } from "../store";

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  data = {},
  selected,
}) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const [text, setText] = useState(data.text || "");

  const { setEdges } = useReactFlow();

  const { read, setRead } = ReadStore();

  useEffect(() => {
    if (data.text !== text) {
      setText(data.text || "");
    }
  }, [data.text]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  const [edgePath, labelX, labelY] = (
    data.edgeType === "직선" ? getStraightPath : getBezierPath
  )({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    if (data.onTextChange) {
      data.onTextChange(id, newText);
    }
  };

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: selected ? "grey" : style.stroke,
          strokeWidth: selected ? 4 : style.strokeWidth,
          strokeDasharray: data.lineStyle === "실선" ? "" : "4",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${
              labelX + 4
            }px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
            backgroundColor: "white",
            padding: "2px",
          }}
          className="nodrag nopan"
        >
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            style={{
              border: read ? "none" : null,
              textAlign: "center",
            }}
            readOnly={read}
          />
          {!read && (
            <button className="edgebutton" onClick={onEdgeClick}>
              ×
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default FloatingEdge;
