import { useCallback, useState, useEffect } from 'react';
import { useStore, getStraightPath } from 'reactflow';

import { getEdgeParams } from './util';

function getAngle(sx, sy, tx, ty) {
  return Math.atan2(ty - sy, tx - sx) * (180 / Math.PI);
}

function FloatingEdge({ id, source, target, markerEnd, style, data = {}, onTextChange, selected }) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const [text, setText] = useState(data.text || '');

  useEffect(() => {
    if (data.text !== text) {
      setText(data.text || '');
    }
  }, [data.text]);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  const angle = getAngle(sx, sy, tx, ty);

  // const handleTextChange = (event) => {
  //   const newText = event.target.value;
  //   setText(newText);
  //   if (onTextChange) {
  //     onTextChange(id, newText);
  //   }
  // };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: selected ? 'grey' : style.stroke,
          strokeWidth: selected ? 4 : style.strokeWidth,
        }}
      />
      {/* <foreignObject
        width={100}
        height={30}
        x={labelX - 50}
        y={labelY - 15}
        transform={`rotate(${angle}, ${labelX}, ${labelY})`}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid black',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </foreignObject> */}
    </>
  );
}

export default FloatingEdge;