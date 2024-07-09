import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useEffect, useRef, useState } from "react";
import MyVerticallyCenteredModal from "../Asset/Modal";

const Posting = styled.div`
  height: 90vh;
  display: flex;
`;

const Edit = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const Main = styled.div`
  height: 90%;
  width: 100%;
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
  });
  const PrevCountRef = useRef(); // 이전 인물 수
  const [mount, setMount] = useState(false); // 페이지 로드
  const [infos, setInfos] = useState([]); // 인물정보
  const [next, setNext] = useState(false); // 다음 버튼 활성 여부
  const [extraSave, setExtraSave] = useState(false); // 임시서장 = false / 저장 = true
  const [modalShow, setModalShow] = useState(false);

  const [edgeType, setEdgetype] = useState("직선"); // 직선 / 곡선
  const [lineStyle, setLine] = useState("실선"); // 실선 / 점선

  useEffect(() => {
    PrevCountRef.current = count;
  }, [count]); // count가 변경될 때만 실행

  const prevCount = PrevCountRef.current;

  useEffect(() => {
    if (!mount) {
      // 컴포넌트가 마운트될 때만 실행
      const newInfos = Array.from({ length: count }, (_, i) => ({
        id: i,
        name: "",
        species: "",
        gender: "",
        age: "",
        personality: "",
        otherInfo: "",
        img: "",
      }));
      setInfos(newInfos);
      setMount(true);
    } else if (prevCount !== count) {
      const newInfos = Array.from({ length: count }, (_, i) => ({
        id: i,
        name: "",
        species: "",
        gender: "",
        age: "",
        personality: "",
        otherInfo: "",
        img: "",
      }));

      if (prevCount < count) {
        setInfos((prevInfos) => [...prevInfos, ...newInfos.slice(prevCount)]);
      } else if (prevCount > count) {
        setInfos((prevInfos) => prevInfos.slice(0, count));
      }

      if (count <= 1) {
        setCount(1);
      } else if (count > 30) {
        setCount(30);
      }
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
          <p style={{ height: "100%" }}>
            <ReactFlowProvider>
              <Mindmap
                count={count}
                infos={infos}
                work={work}
                edgeType={edgeType}
                lineStyle={lineStyle}
              />
            </ReactFlowProvider>{" "}
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </p>
        );
      default:
        return null;
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
            justifyContent: state === 1 ? "flex-end" : "space-between",
          }}
        >
          {state === 2 ? (
            <Prevbtn
              onClick={() => {
                if (state === 2) {
                  setState(1);
                  document.querySelector("#nextBtn").innerHTML = "다음";
                }
              }}
            >
              이전
            </Prevbtn>
          ) : null}
          {!next ? (
            <>
              <ExtraSave onClick={() => setExtraSave(false)}>
                임시저장
              </ExtraSave>
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
                  if (state === 1) {
                    setState(2);
                    document.querySelector("#nextBtn").innerHTML = "저장";
                    setExtraSave(true);
                  } else if (state === 2) {
                    // 저장 로직 추가
                    setModalShow(true);
                  }
                }}
              >
                다음
              </Nextbtn>
            </div>
          )}
        </Foot>
      </Edit>
    </Posting>
  );
}
