import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useState, version } from "react";

const Posting = styled.div``;

const MainPt = styled.div`
  width: 80%;
  height: 100vh;
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Post() {
  const [state, setState] = useState(false); // false = 정보입력, true = 관계도수정
  const [work, setWork] = useState({
    title: "",
    version: "1",
    genre: "",
  });
  const [count, setCount] = useState(5); // 인물 수

  return (
    <Posting>
      <PersonInfo>
        <Sidebar
          count={count}
          setCount={setCount}
          state={state}
          setState={setState}
          work={work}
          setWork={setWork}
        />
        <MainPt>
          {state == false ? (
            <EditCharacter count={count} setCount={setCount} />
          ) : (
            <ReactFlowProvider>
              <Mindmap count={count} />
            </ReactFlowProvider>
          )}
        </MainPt>
      </PersonInfo>
    </Posting>
  );
}
