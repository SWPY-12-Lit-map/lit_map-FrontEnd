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
  const [extraSave, setExtraSave] = useState(false); // 임시서장 = false / 저장 = true
  const [modalShow, setModalShow] = useState(false); // 인물 관계도 저장 후 모달
  const [backgroundType, setBackground] = useState(true); // 이미지 = true. 단색 = false
  const [backgroundImg, setBackImg] = useState(null); // 인물 관계도 배경 이미지

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
  const setRead = props.setRead;
  const read = props.read;

  const { workInfos, addWorkInfos } = useStore();
  const getWork = { ...workInfos };

  useEffect(() => {
    PrevCountRef.current = count;
  }, [count]); // count가 변경될 때만 실행

  const prevCount = PrevCountRef.current;

  useEffect(() => {
    setRead(false);

    if (!mount) {
      // 컴포넌트가 마운트될 때만 실행
      const newInfos = Array.from({ length: count }, (_, i) => ({
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
    } else if (prevCount !== count) {
      const newInfos = Array.from({ length: count }, (_, i) => ({
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
  }, [count, mount, prevCount, work]);

  useEffect(() => {
    console.log(work);
  }, [work]);

  useEffect(() => {
    // console.log(getWork);
    if (workInfos.workId) {
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
        publisherDate: "",

        relationship: workInfos.versions.relationship,
      });
      setCount(workInfos.versions.casts.length);
      setInfos(workInfos.versions.casts);
    }
  }, []);

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
          {!next ? (
            <>
              <ExtraSave
                onClick={() => {
                  const Extrasave = { ...work, confirmCheck: false };
                  setWork(Extrasave);
                  axios
                    .post("https://api.litmap.store/api/work", work)
                    .then((result) => {
                      console.log(result);
                    })
                    .then((error) => {
                      console.log(error);
                    });
                }}
              >
                임시저장
              </ExtraSave>
              <Nextbtn
                disabled
                style={{ borderColor: "#9F9F9F", color: "#9F9F9F" }}
              >
                다음
              </Nextbtn>
            </>
          ) : (
            <div>
              <ExtraSave
                onClick={() => {
                  const Extrasave = { ...work, confirmCheck: false };
                  setWork(Extrasave);
                  axios
                    .post("https://api.litmap.store/api/work", work)
                    .then((result) => {
                      console.log(result);
                    })
                    .then((error) => {
                      console.log(error);
                    });
                }}
              >
                임시저장
              </ExtraSave>
              <Nextbtn
                id="nextBtn"
                onClick={() => {
                  if (state === 1) {
                    setState(2);
                    document.querySelector("#nextBtn").innerHTML = "저장";
                    setWork({ ...work, author: namesString });
                    console.log(work);
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
