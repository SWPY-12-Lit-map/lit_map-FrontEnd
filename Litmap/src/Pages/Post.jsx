import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Mindmap from "../Asset/Mindmap/Mindmap";
import Sidebar from "../Asset/Sidebar/Sidebar";
import EditCharacter from "../Asset/EditCharacter";
import { useEffect, useRef, useState, version } from "react";
import MyVerticallyCenteredModal from "../Asset/Modal";
import axios from "axios";
import { useStore } from "../Asset/store";

const Posting = styled.div`
  height: 100%;
  display: flex;
  background-color: #fbf9f6;
`;

const Edit = styled.div`
  width: 80%;
  height: 100%;
  background-color: #fbf9f6;
  transition: all 1s;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
`;

const Side = styled.div`
  width: 30%;
  height: 100%;
  border: none;
  position: absolute;
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  height: 10%;
  position: relative;
  bottom: 100px;
`;

const Prevbtn = styled.button`
  color: #8b0024;
  background-color: unset;
  border: 1px solid #8b0024;
  border-radius: 5px;
  padding: 5px 20px;
  width: 110px;
`;

const Nextbtn = styled.button`
  color: #8b0024;
  background-color: unset;
  border: 1px solid #8b0024;
  border-radius: 5px;
  padding: 5px 20px;
  width: 110px;
`;

const ExtraSave = styled.button`
  color: #8b0024;
  border: 1px solid #8b0024;
  border-radius: 5px;
  background-color: unset;
  padding: 5px 20px;
  width: 110px;
  margin-right: 10px;
`;

export default function Post(props) {
  const [state, setState] = useState(1); // 1 = 작품정보입력, 2 = 인물정보입력 ,3 = 관계도입력

  const PrevCountRef = useRef(); // 이전 인물 수
  const [mount, setMount] = useState(false); // 페이지 로드

  const [mainAuthor, setMainauth] = useState("");
  const [next, setNext] = useState(false); // 다음 버튼 활성 여부
  const [isSaveEnabled, setIsSaveEnabled] = useState(false); // 임시 저장 버튼 활성 여부
  const [extraSave, setExtraSave] = useState(false); // 임시서장 = false / 저장 = true
  const [modalShow, setModalShow] = useState(false); // 인물 관계도 저장 후 모달
  const [backgroundType, setBackground] = useState(true); // 이미지 = true. 단색 = false
  const [backgroundImg, setBackImg] = useState(null); // 인물 관계도 배경 이미지
  const { read, setRead } = useStore();

  // nav 조작
  const [hideNav, setHide] = useState(false);

  const count = props.count;
  const setCount = props.setCount;
  const characterInfos = props.characterInfos;
  const setInfos = props.setInfos;
  const work = props.work;
  const setWork = props.setWork;
  const edgeType = props.edgeType;
  const setEdgetype = props.setEdgetype;
  const lineStyle = props.lineStyle;
  const setLine = props.setLine;
  const { workInfos, addWorkInfos } = useStore();
  const getWork = { ...workInfos };

  useEffect(() => {
    PrevCountRef.current = count;
  }, [count]); // count가 변경될 때만 실행

  const prevCount = PrevCountRef.current;

  // 컴포넌트가 마운트될 때 실행되는 useEffect
  useEffect(() => {
    if (workInfos.workId) {
      setRead(false);
      // 임시저장 불러오기
      setWork({
        category: workInfos.category,
        confirmCheck: false,
        author: workInfos.author,
        contents: workInfos.contents,
        imageUrl: workInfos.imageUrl,
        version: workInfos.versions.versionNum,
        versionName: workInfos.versions.versionName,
        title: workInfos.title,
        publisherName: "민음사",
        genre: workInfos.genre,
        memberId: 24,
        publisherDate: workInfos.publisherDate,
        workId: workInfos.workId,
        relationship: workInfos.versions.relationship,
        casts: workInfos.versions.casts,
      });
      setInfos(workInfos.versions.casts);
      setCount(workInfos.versions.casts.length);
    } else {
      // 초기 상태 설정
      const newInfos = Array.from({ length: count }, () => ({
        name: "",
        imageUrl: "",
        type: "",
        role: "",
        gender: "",
        age: "",
        mbti: "",
        contents: "",
      }));
      setInfos(newInfos);
      setMount(true);
    }
  }, []);

  useEffect(() => {
    if (mount && prevCount !== count) {
      const newInfos = Array.from({ length: count }, () => ({
        name: "",
        imageUrl: "",
        type: "",
        role: "",
        gender: "",
        age: "",
        mbti: "",
        contents: "",
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

  // work, characterInfos를 감지버튼 활성화 여부 업데이트
  useEffect(() => {
    const isWorkValid =
      work.title && work.casts.every((cast) => cast.name && cast.type);
    setIsSaveEnabled(isWorkValid);
  }, [work, characterInfos]);

  // 다음 버튼의 활성화 여부
  // useEffect(() => {
  //   setNext(isSaveEnabled && state === 2);
  // }, [isSaveEnabled, state]);

  const Mainpart = () => {
    switch (state) {
      case 1:
        return (
          <EditCharacter
            count={count}
            setCount={setCount}
            characterInfos={characterInfos}
            setInfos={setInfos}
            prevCount={prevCount}
            work={work}
          />
        );
      case 2:
        return (
          <p style={{ height: "100%", width: "100%" }}>
            <ReactFlowProvider>
              <Mindmap
                count={count}
                characterInfos={characterInfos}
                work={work}
                setWork={setWork}
                edgeType={edgeType}
                lineStyle={lineStyle}
                read={read}
                backgroundImg={backgroundImg}
                setBackImg={setBackImg}
              />
            </ReactFlowProvider>{" "}
            <MyVerticallyCenteredModal
              work={work}
              setWork={setWork}
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
          setBackground={setBackground}
          backgroundImg={backgroundImg}
          setBackImg={setBackImg}
          backgroundType={backgroundType}
          setMainauth={setMainauth}
          hideNav={hideNav}
          setHide={setHide}
        />
      </Side>
      <Edit
        style={{
          width: hideNav ? "100%" : "70%",
          transform: hideNav ? "translateX(0)" : "translateX(42.8%)",
        }}
      >
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
          <div>
            <ExtraSave
              disabled={!isSaveEnabled}
              onClick={() => {
                const Extrasave = { ...work, confirmCheck: false };
                setWork(Extrasave);
                console.log(work);
                axios
                  .post("https://api.litmap.store/api/work", work)
                  .then((result) => {
                    console.log(result);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              style={
                !isSaveEnabled
                  ? { borderColor: "#9F9F9F", color: "#9F9F9F" }
                  : {}
              }
            >
              임시저장
            </ExtraSave>
            <Nextbtn
              id="nextBtn"
              disabled={!next}
              onClick={() => {
                if (state === 1) {
                  setState(2);
                  document.querySelector("#nextBtn").innerHTML = "저장";
                  console.log(work);
                } else if (state === 2) {
                  // 저장 로직 추가
                  setModalShow(true);
                  const Extrasave = { ...work, confirmCheck: true };
                  setWork(Extrasave);
                  console.log(work);
                  {
                    work.confirmCheck
                      ? axios
                          .post("https://api.litmap.store/api/work", work)
                          .then((result) => {
                            console.log(result);
                          })
                          .catch((error) => {
                            console.log(error);
                          })
                      : console.log("loading");
                  }
                }
              }}
              style={!next ? { borderColor: "#9F9F9F", color: "#9F9F9F" } : {}}
            >
              다음
            </Nextbtn>
          </div>
        </Foot>
      </Edit>
    </Posting>
  );
}
