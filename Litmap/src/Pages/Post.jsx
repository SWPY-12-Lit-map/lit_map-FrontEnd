import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useEffect, useRef, useState } from "react";

const Posting = styled.div`
  height: 90vh;

  display: flex;
`;

const Edit = styled.div`
  width: 80%;
  height: 100%;
  background-color: white;
`;

const Main = styled.div`
  height: 90%;
`;

const Side = styled.div``;

const Foot = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
  background-color: lightgray;
`;

const Prevbtn = styled.button`
  background-color: white;
  border: none;
  padding: 5px 20px;
  width: 110px;
`;

const Nextbtn = styled.button`
  color: white;
  background-color: #0d6efd;
  border: none;
  padding: 5px 20px;
  width: 110px;
`;

const ExtraSave = styled.button`
  border: none;
  padding: 5px 20px;
  width: 110px;
  margin-right: 10px;
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
  const [next, setNext] = useState(false);

  const [edgeType, setEdgetype] = useState(); // 직선 / 곡선
  const [lineStyle, setLine] = useState(); // 실선 / 점선

  useEffect(() => {
    PrevCountRef.current = count;
  });
  const prevCount = PrevCountRef.current;

  useEffect(() => {
    const newInfos = Array.from({ length: count }, (_, i) => ({
      id: i, // 캐릭터 삭제 때문에 필요
      name: "",
      species: "",
      gender: "",
      age: "",
      personality: "",
      otherInfo: "",
      img: "",
    })); //

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
          <EditCharacter
            count={count}
            setCount={setCount}
            infos={infos}
            setInfos={setInfos}
            prevCount={prevCount}
          />
        );
      case 2:
        return (
          <ReactFlowProvider>
            <Mindmap
              count={count}
              infos={infos}
              work={work}
              edgeType={edgeType}
              lineStyle={lineStyle}
            />
          </ReactFlowProvider>
        );
    }
  };

  return (
    <Posting>
      <Side>
        <Sidebar
          count={count}
          setCount={setCount}
          state={state}
          setState={setState}
          work={work}
          setWork={setWork}
          next={next}
          setNext={setNext}
          edgeType={edgeType}
          setEdgetype={setEdgetype}
          lineStyle={lineStyle}
          setLine={setLine}
        />
      </Side>
      <Edit>
        <Main>{Mainpart()}</Main>
        <Foot
          style={{
            justifyContent: state == 1 ? "flex-end" : "space-between",
          }}
        >
          {" "}
          {state == 2 ? (
            <Prevbtn
              onClick={() => {
                if (state == 2) {
                  setState(1);
                  document.querySelector("#nextBtn").innerHTML = "다음";
                }
              }}
            >
              이전
            </Prevbtn>
          ) : null}
          {next == false ? (
            <>
              <ExtraSave>임시저장</ExtraSave>
              <Nextbtn disabled style={{ background: "gray", border: "none" }}>
                다음
              </Nextbtn>
            </>
          ) : (
            <div>
              <ExtraSave>임시저장</ExtraSave>
              <Nextbtn
                id="nextBtn"
                onClick={() => {
                  if (state == 1) {
                    setState(2);
                    document.querySelector("#nextBtn").innerHTML = "저장";
                  } else if (state == 2) {
                  }
                }}
              >
                다음
              </Nextbtn>
            </div>
          )}
        </Foot>
      </Edit>{" "}
    </Posting>
  );
}
