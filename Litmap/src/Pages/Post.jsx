import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useEffect, useRef, useState } from "react";

const Posting = styled.div`
  height: 90vh;
`;

const MainPt = styled.div`
  width: 80%;
`;

const EmptyPg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default function Post() {
  const [state, setState] = useState(1); // 1 = 작품정보입력, 2 = 인물정보입력 ,3 = 관계도입력
  const [count, setCount] = useState(3); // 인물 수
  const [work, setWork] = useState({
    title: "",
    defaultVersion: "0.1",
    userVersion: "",
    genre: "",
    thumbnail: "",
    count: count,
  });
  const PrevCountRef = useRef();
  const [mount, setMount] = useState(false);
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    PrevCountRef.current = count;
  });
  const prevCount = PrevCountRef.current;

  useEffect(() => {
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

    if (!mount) {
      setInfos(newInfos);
      setMount(true);
    } else if (prevCount < count) {
      // 카드 추가시
      setInfos((prevInfos) => [...prevInfos, ...newInfos.slice(prevCount)]);
    } else if (prevCount > count) {
      // 카드 삭제시
      setInfos((prevInfos) => prevInfos.slice(0, count));
    } else if (count < 0) {
      setCount(0);
    } else if (count > 30) {
      setCount(30);
    }
  }, [count, mount, prevCount]);

  const Mainpart = () => {
    switch (state) {
      case 1:
        return (
          <EmptyPg>
            <h1>empty page</h1>
            <div>인물 카드를 준비 중이에요.</div>
          </EmptyPg>
        );
      case 2:
        return (
          <EditCharacter
            count={count}
            setCount={setCount}
            infos={infos}
            setInfos={setInfos}
            prevCount={prevCount}
          />
        );
      case 3:
        return (
          <ReactFlowProvider>
            <Mindmap count={count} infos={infos} work={work} />
          </ReactFlowProvider>
        );
    }
  };

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
        <MainPt>{Mainpart()}</MainPt>{" "}
      </PersonInfo>
    </Posting>
  );
}
