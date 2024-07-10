import styled from "styled-components";
import Category from "../Asset/Category";
import axios from "axios";
import { useState } from "react";
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

const GetInfo = async () => {
  await axios
    .get("http://43.200.133.58:8080/api/work/1")
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function Work(props) {
  const [state, setState] = useState(false);
  const count = props.count;
  const infos = props.infos;
  const work = props.work;
  const edgeType = props.edgeType;
  const lineStyle = props.lineStyle;
  return (
    <>
      <Category />
      <Body>
        <Workinfo>
          <Thumbnail src="/poster1.png" alt="썸네일 자리"></Thumbnail>
          <Description>
            <Title>뷰티인사이드</Title> <State>완결</State>
            <SelectBar>
              <Button
                onClick={() => {
                  setState(false);
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
                <Author>감독/작가</Author>
                <Releasedate>개봉/출판일자</Releasedate>
                <Season>시즌</Season>
                <Channel>공급사이트</Channel>
                <Content>간단내용</Content>
                <Btns>
                  <Btn1>
                    <HiOutlinePlayPause />
                    바로보기
                  </Btn1>
                  <ModalBtn />
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
              infos={infos}
              work={work}
              edgeType={edgeType}
              lineStyle={lineStyle}
            ></Mindmap>
          </ReactFlowProvider>
        </Connection>
        <Recommend>
          <h3>함께 볼만한 드라마</h3>
          <Recommends>
            <img src="/poster1.png"></img>
            <img src="/poster2.png"></img>
            <img src="/poster3.png"></img>
            <img src="/poster4.png"></img>
          </Recommends>
        </Recommend>
        {/* <button
          onClick={() => {
            axios
              .get("http://43.200.133.58:8080/api/work/1")
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
