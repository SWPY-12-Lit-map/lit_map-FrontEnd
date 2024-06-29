import { ReactFlowProvider } from "reactflow";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Dropping from "../Asset/Share/ModalBtn";

export default function Connection() {
  return (
    <div style={{ width: "90vw", height: "90vh" }}>
      <ReactFlowProvider>
        <Mindmap> </Mindmap>
        <Dropping></Dropping>
      </ReactFlowProvider>
    </div>
  );
}
