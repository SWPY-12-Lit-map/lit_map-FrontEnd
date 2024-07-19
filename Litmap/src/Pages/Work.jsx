import styled from "styled-components";
import Category from "../Asset/Category";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { HiOutlinePlayPause } from "react-icons/hi2";
import ModalBtn from "../Asset/Share/ModalBtn";
import Mindmap from "../Asset/Mindmap/Mindmap";
import { ReactFlowProvider } from "reactflow";

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
const Info = styled.div``;
const List = styled.div``;
const Author = styled(List)``;
const Releasedate = styled(List)``;
const Season = styled(List)``;
const Channel = styled(List)``;
const Content = styled(List)``;
const Btns = styled.div`
  display: flex;
  margin-top: 30px;
`;
const Btn1 = styled(Button)`
  border-radius: 10px;
  width: 40%;
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Btn2 = styled(Btn1)`
  width: 25%;
`;

const RelatedVideo = styled.div``;

const Connection = styled.div`
  width: 80vw;
  height: 60vh;
`;
const Recommend = styled.div`
  margin-top: 50px;
`;

const Recommends = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Work(props) {
  const [state, setState] = useState(false);
  const [workInfo, setWorkInfo] = useState({
    workId: 5,
    category: "책",
    genre: ["액션"],
    author: ["작가"],
    imageUrl: "대체 이미지",
    memberName: "탈퇴한 회원입니다.",
    title: "제목",
    contents: "1",

    versions: {
      versionNum: 0.1,
      versionName: "버전명",
      casts: [
        {
          name: "인물1",
          imageUrl: "임시 사진",
          type: "인간",
          role: null,
          gender: "",
          age: 0,
          mbti: "",
          contents: "",
        },
        {
          name: "인물2",
          imageUrl: "임시 사진",
          type: "인간",
          role: null,
          gender: "",
          age: 0,
          mbti: "",
          contents: "",
        },
        {
          name: "인물3",
          imageUrl: "임시 사진",
          type: "인간",
          role: null,
          gender: "",
          age: 0,
          mbti: "",
          contents: "",
        },
      ],
      relationship: {
        work_id: "제목",
        nodes: [
          {
            id: "0",
            data: {
              id: 0,
              age: "",
              mbti: "",
              name: "인물1",
              type: "",
              gender: "",
              contents: "",
              imageUrl: "",
            },
            type: "custom",
            width: 102,
            height: 102,
            dragging: false,
            position: {
              x: 479.31138790035584,
              y: 656.0512455516015,
            },
            selected: false,
            positionAbsolute: {
              x: 479.31138790035584,
              y: 656.0512455516015,
            },
          },
          {
            id: "1",
            data: {
              id: 1,
              age: "",
              mbti: "",
              name: "인물2",
              type: "",
              gender: "",
              contents: "",
              imageUrl: "",
            },
            type: "custom",
            width: 102,
            height: 102,
            dragging: false,
            position: {
              x: 692.8032028469751,
              y: 477.0505338078292,
            },
            selected: true,
            positionAbsolute: {
              x: 692.8032028469751,
              y: 477.0505338078292,
            },
          },
          {
            id: "2",
            data: {
              id: 2,
              age: "",
              mbti: "",
              name: "인물3",
              type: "",
              gender: "",
              contents: "",
              imageUrl: "",
            },
            type: "custom",
            width: 102,
            height: 102,
            dragging: false,
            position: {
              x: 908.0683274021352,
              y: 666.8982206405694,
            },
            selected: false,
            positionAbsolute: {
              x: 908.0683274021352,
              y: 666.8982206405694,
            },
          },
        ],
        viewport: {
          x: -820.3305237808547,
          y: -805.8305237808547,
          zoom: 1.691751956652619,
        },
        edges: [
          {
            id: "reactflow__edge-0-1",
            data: {
              text: "테스트1",
              edgeType: "직선",
              lineStyle: "실선",
            },
            type: "floating",
            style: {
              stroke: "black",
              strokeWidth: 2,
            },
            source: "0",
            target: "1",
            selected: false,
            markerEnd: {
              type: "arrowclosed",
              color: "black",
            },
            sourceHandle: null,
            targetHandle: null,
          },
          {
            id: "reactflow__edge-2-1",
            data: {
              text: "테스트2",
              edgeType: "직선",
              lineStyle: "실선",
            },
            type: "floating",
            style: {
              stroke: "black",
              strokeWidth: 2,
            },
            source: "2",
            target: "1",
            selected: false,
            markerEnd: {
              type: "arrowclosed",
              color: "black",
            },
            sourceHandle: null,
            targetHandle: null,
          },
        ],
        version: null,
      },
    },
    versionList: [],
  }); // 백엔드에서 받은거를 저장

  const count = props.count;
  const characterInfos = props.characterInfos;
  const work = props.work;
  const edgeType = props.edgeType;
  const lineStyle = props.lineStyle;
  const read = props.read;
  const setRead = props.setRead;

  const GetWork = async () => {
    await axios
      .get("https://api.litmap.store/api/work/5")
      .then((result) => {
        const Get = result.data.result;
        setWorkInfo(Get);
        console.log(workInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setRead(true); // 컴포넌트가 마운트될 때 read를 true로 설정
    // GetWork()
    // 데이터를 가져오는 함수 호출
  }, [setWorkInfo, setWorkInfo, read]);

  return (
    <>
      <Category />
      <Body>
        <Workinfo>
          <Thumbnail src="/poster1.png" alt="썸네일 자리"></Thumbnail>
          <Description>
            <Title>{workInfo.title}</Title>{" "}
            <State>완결여부 결정도 해야됨</State>
            <SelectBar>
              <Button
                onClick={() => {
                  setState(false);
                  console.log(work);
                }}
                style={{
                  backgroundColor: state == false ? "#8d2741" : "white",
                  border: state == false ? "#8d2741" : "white",
                  color: state == false ? "white" : "black",
                }}
              >
                기본정보
              </Button>{" "}
              <Button
                onClick={() => {
                  setState(true);
                }}
                style={{
                  backgroundColor: state == true ? "#8d2741" : "white",
                  border: state == true ? "#8d2741" : "white",
                  color: state == true ? "white" : "black",
                }}
              >
                연관영상
              </Button>
            </SelectBar>
            {state == false ? (
              <Info>
                <Author>감독/작가: {workInfo.author}</Author>
                <Releasedate>개봉/출판일자{workInfo.publisherDate}</Releasedate>
                <Season>시즌: 이것도 넣어야 됨</Season>
                <Channel>공급사이트: 이것도 넣어야 함</Channel>
                <Content>간단내용 {workInfo.contents}</Content>
                <Btns>
                  <ModalBtn /> {/* 공유하기 */}
                </Btns>
              </Info>
            ) : (
              <RelatedVideo>
                <YouTube videoId="ESPFTY8Y-xM"></YouTube>
              </RelatedVideo>
            )}
          </Description>
        </Workinfo>
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
              casts={workInfo.versions.casts}
              relationship={workInfo.versions.relationship}
            />
          </ReactFlowProvider>
        </Connection>
        <Recommend>
          <h3>함께 볼만한 드라마</h3>
          <Recommends>
            <img src="/poster1.png" alt="추천 포스터 1" />
            <img src="/poster2.png" alt="추천 포스터 2" />
            <img src="/poster3.png" alt="추천 포스터 3" />
            <img src="/poster4.png" alt="추천 포스터 4" />
          </Recommends>
        </Recommend>
        {/* <button
          onClick={() => {
            axios
              .get("https://api.litmap.store/api/work/1")
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          확인
        </button> */}
      </Body>
    </>
  );
}
