import styled from "styled-components";
import Category from "../Asset/Category";
import axios from "axios";
import { useEffect, useState } from "react";
import Mindmap from "../Asset/Mindmap/Mindmap";
import { ReactFlowProvider } from "@xyflow/react";
import { useNavigate, useParams } from "react-router-dom";
import { ReadStore, useStore } from "../Asset/store";
import { format } from "date-fns";
import { FadeLoader } from "react-spinners";
import DownloadImg from "../Asset/Share/DownloadImg";
import Modal from "react-modal";

const LoadingPage = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 200px;
`;

const Workinfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Thumbnail = styled.img`
  width: 30%;
`;

const Description = styled.div`
  width: 70%;
  border-left: 1px solid black;
  padding: 0 30px;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 30px;
  margin-bottom: 10px;
`;

const SelectBar = styled.div`
  margin: 25px 0;
`;

const State = styled.span`
  font-size: 12px;
  border: 2px solid #8d2741;
  color: #8d2741;
  border-radius: 50px;
  padding: 5px 11px;
  position: relative;
  bottom: 5px;
  left: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: white;
  border-radius: 20px;
  padding: 5px 10px;
  color: black;
  margin-right: 30px;
`;

const Info = styled.div`
  & > * {
    margin-bottom: 10px;
  }
`;

const ModalOpenBtn = styled.button`
  position: absolute;
  top: 118%;
  right: 95px;
  background-color: white;
  border-color: #8d2741;
  color: #8d2741;
  padding: 5px 10px;
  border-radius: 5px;
`;

const List = styled.div``;
const Author = styled(List)``;
const Releasedate = styled(List)``;
const Season = styled(List)``;
const Channel = styled(List)``;
const Content = styled(List)``;

const Btn = styled(Button)`
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  width: 5%;
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RelatedVideo = styled.div``;

const Connection = styled.div`
  width: 80vw;
  height: 60vh;
  border: 1px solid black;
`;

const Recommend = styled.div`
  margin-top: 50px;
`;

const Recommends = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(5, 1fr);
  & > div > img {
    width: 200px;
    &:hover {
      cursor: pointer;
    }
  }
  & > div > p {
    display: none;
  }
`;

const Versions = styled.div`
  display: flex;
`;

// Modal 스타일
const CustomModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 90vh;
  padding: 0;
  border: 1px solid black;
  background-color: white;
  & > button {
    position: fixed;
    top: 0%;
    right: 0%;
  }
`;

export default function Work({
  count,
  characterInfos,
  work,
  edgeType,
  lineStyle,
  setWork,
  mega,
  setMega,
}) {
  const [state, setState] = useState(false);
  const date = new Date();
  const [workInfo, setWorkInfo] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();
  const { setBackgroundColor } = useStore();
  const { read, setRead } = ReadStore();
  const [relatedWork, setRelatedWork] = useState([]);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열기 상태

  const GetWork = async () => {
    setLoading(true); // Start loading
    await axios
      .get(`https://api.litmap.store/api/work/${id}`)
      .then((result) => {
        setRead(true);
        const Get = result.data.result;
        setWorkInfo(Get);
        setBackgroundColor(
          Get.versions.relationship.backgroundColor
            ? Get.versions.relationship.backgroundColor
            : "white"
        );
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // End loading
      });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "날짜 정보 없음"
      : format(date, "yyyy년 MM월 dd일");
  };

  // ID가 변경될 때마다 작업을 새로 가져옴
  useEffect(() => {
    setWork({
      confirmCheck: false,
      category: "",
      genre: [],
      author: [],
      imageUrl: "",
      memberId: 24,
      title: "",
      contents: "",
      publisherDate: date,
      version: 0.1,
      versionName: "",
      publisherName: "민음사",
      casts: [
        {
          name: "",
          imageUrl: "",
          type: "",
          role: "",
          gender: "",
          age: "",
          mbti: "",
          contents: "",
        },
      ],
      relationship: {},
    });
    setBackgroundColor("");
    setRead(true);
    GetWork();
  }, [id]); // ID가 변경될 때마다 실행

  // 연관작품 가져오기
  useEffect(() => {
    axios
      .get(`https://api.litmap.store/api/relate/related/${id}`)
      .then((result) => {
        setRelatedWork([...result.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // ID가 변경될 때마다 실행

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <LoadingPage>
        <FadeLoader color="#8d2741" />
      </LoadingPage>
    ); // Loading indicator
  }

  return (
    <>
      <Category mega={mega} setMega={setMega} />
      <Body>
        <Workinfo>
          <Thumbnail src={workInfo.imageUrl} alt="썸네일 자리"></Thumbnail>
          <Description>
            <Title>{workInfo.title}</Title>
            <SelectBar>
              <Button
                onClick={() => setState(false)}
                style={{
                  backgroundColor: state === false ? "#8d2741" : "white",
                  border: state === false ? "#8d2741" : "white",
                  color: state === false ? "white" : "black",
                }}
              >
                기본정보
              </Button>
              <Button
                onClick={() => setState(true)}
                style={{
                  backgroundColor: state === true ? "#8d2741" : "white",
                  border: state === true ? "#8d2741" : "white",
                  color: state === true ? "white" : "black",
                }}
              >
                연관영상
              </Button>
            </SelectBar>
            {state === false ? (
              <Info>
                <Author>
                  감독/작가:{" "}
                  {workInfo.author ? workInfo.author.join(", ") : null}
                </Author>
                <Releasedate>
                  오픈: {formatDate(workInfo.publisherDate)}
                </Releasedate>
                <Season>
                  장르: {workInfo.genre ? workInfo.genre.join(", ") : null}
                </Season>
                <Channel>카테고리: {workInfo.category}</Channel>
                <Content>내용: {workInfo.contents}</Content>
              </Info>
            ) : (
              <RelatedVideo>{/* 유튜브 자리 */}</RelatedVideo>
            )}
          </Description>
        </Workinfo>
        <Versions>
          {workInfo.versionList
            ? workInfo.versionList.map((a, i) => {
                return <Btn key={i}>{a.versionNum}</Btn>;
              })
            : null}
        </Versions>
        <Connection>
          <ReactFlowProvider>
            <Mindmap
              count={count}
              characterInfos={characterInfos}
              work={work}
              edgeType={edgeType}
              lineStyle={lineStyle}
              workInfo={workInfo}
              read={read}
              setRead={setRead}
              relationship={workInfo.versions?.relationship}
            />
          </ReactFlowProvider>
          <ModalOpenBtn
            onClick={() => {
              openModal();
            }}
          >
            크게보기
          </ModalOpenBtn>
        </Connection>
        <Recommend>
          <h3>함께 볼만한 드라마</h3>
          <Recommends>
            {relatedWork?.map((data, i) => (
              <div key={i} onClick={() => navigate(`/work/${data.workId}`)}>
                <img src={data.imageUrl} alt="추천 포스터" />
                <p>{data.title}</p>
              </div>
            ))}
          </Recommends>
        </Recommend>
      </Body>
      {/* 모달 */}
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
      >
        <ReactFlowProvider>
          <Mindmap
            count={count}
            characterInfos={characterInfos}
            work={work}
            edgeType={edgeType}
            lineStyle={lineStyle}
            workInfo={workInfo}
            read={read}
            setRead={setRead}
            relationship={workInfo.versions?.relationship}
            modalState={modalIsOpen}
          />
        </ReactFlowProvider>
        <Button
          onClick={closeModal}
          style={{
            width: "80px",
            padding: "10px",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          닫기
        </Button>
      </CustomModal>
    </>
  );
}
