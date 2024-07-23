import { useCallback, useState, useEffect } from "react";
import {
  useStore,
  getStraightPath,
  useReactFlow,
  EdgeLabelRenderer,
  getBezierPath,
} from "reactflow";

import { getEdgeParams } from "./util";

function getAngle(sx, sy, tx, ty) {
  return Math.atan2(ty - sy, tx - sx) * (180 / Math.PI);
}

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  data = {},
  onTextChange,
  selected,
}) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const [text, setText] = useState(data.text || "");

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
    data.edgeType == "직선" ? getStraightPath : getBezierPath
  )({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  });

  const angle = getAngle(sx, sy, tx, ty);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    if (onTextChange) {
      onTextChange(id, newText);
    }
    console.log(data.edgeType);
    console.log(data.read);
  };

  const ChangeinputStyle =
    (-125 <= angle && angle <= -45) || (45 < angle && angle < 125)
      ? { writingMode: "vertical-lr", textOrientation: "upright" }
      : null;

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
  const { setEdges } = useReactFlow();

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
          strokeDasharray: data.lineStyle == "실선" ? "" : "4",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {" "}
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            style={{
              border: data.read ? "none" : null,
              textAlign: "center",
              // ...ChangeinputStyle,
            }}
            readOnly={data.read ? true : false}
          />
          {data.read ? null : (
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
