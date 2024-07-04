import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useEffect, useRef, useState } from "react";

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
  const [count, setCount] = useState(3); // 인물 수
  const PrevCountRef = useRef();
  const [mount, setMount] = useState(false);

  const [infos, setInfos] = useState([]);
  const newInfos = Array.from({ length: count }, (_, i) => ({
    id: i,
    name: "",
    species: "",
    gender: "",
    age: "",
    personality: "",
    otherInfo: "",
    img: null,
  }));

  useEffect(() => {
    PrevCountRef.current = count;
  });
  const prevCount = PrevCountRef.current;

  useEffect(() => {
    if (mount == false) {
      setInfos(newInfos);
      setMount(true);
    } else if (mount == true && prevCount <= count) {
      setInfos([...infos, newInfos[newInfos.length - 1]]);
    } else {
    }
  }, [count]);

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
            <EditCharacter
              count={count}
              setCount={setCount}
              infos={infos}
              setInfos={setInfos}
              prevCount={prevCount}
            />
          ) : (
            <ReactFlowProvider>
              <Mindmap count={count} infos={infos} />
            </ReactFlowProvider>
          )}
        </MainPt>
      </PersonInfo>
    </Posting>
  );
}
