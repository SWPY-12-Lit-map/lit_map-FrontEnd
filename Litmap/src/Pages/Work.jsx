import styled from "styled-components";
import Category from "../Asset/Category";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import ModalBtn from "../Asset/Share/ModalBtn";
import Mindmap from "../Asset/Mindmap/Mindmap";
import { ReactFlowProvider } from "reactflow";
import { useParams } from "react-router-dom";
import { useStore } from "../Asset/store";
import { format } from "date-fns";

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
const List = styled.div``;
const Author = styled(List)``;
const Releasedate = styled(List)``;
const Season = styled(List)``;
const Channel = styled(List)``;
const Content = styled(List)``;

const Btn1 = styled(Button)`
  border-radius: 10px;
  width: 40%;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Work({
  count,
  characterInfos,
  work,
  edgeType,
  lineStyle,
  setWork,
}) {
  const [state, setState] = useState(false);
  const date = new Date();
  const [workInfo, setWorkInfo] = useState({}); // 백엔드에서 받은거를 저장
  const { id } = useParams();
  const { read, setRead, setBackgroundColor } = useStore();

  const GetWork = async () => {
    await axios
      .get(`https://api.litmap.store/api/work/${id}`)
      .then((result) => {
        const Get = result.data.result;
        setWorkInfo(Get);
        console.log(workInfo);
        console.log(result);
        setBackgroundColor(
          Get.versions.relationship.backgroundColor
            ? Get.versions.relationship.backgroundColor
            : "white"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "날짜 정보 없음"
      : format(date, "yyyy년 MM월 dd일");
  };

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
    setRead(true); // 컴포넌트가 마운트될 때 read를 true로 설정
    GetWork();
    // 데이터를 가져오는 함수 호출
    console.log(workInfo);
  }, [read]);

  return (
    <>
      <Category />
      <Body>
        <Workinfo>
          <Thumbnail src={workInfo.imageUrl} alt="썸네일 자리"></Thumbnail>
          <Description>
            <Title>{workInfo.title}</Title>{" "}
            {/* <State>완결여부 결정도 해야됨</State> */}
            <SelectBar>
              <Button
                onClick={() => {
                  setState(false);
                  console.log(workInfo.genre.join(", "));
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
              relationship={workInfo.versions?.relationship}
            />{" "}
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
      </Body>
    </>
  );
}
