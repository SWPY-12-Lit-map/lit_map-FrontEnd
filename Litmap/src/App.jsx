import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MypageLayout from "./Pages/MypageLayout";
import AdminPage from "./Pages/AdminPage";
import Postdone from "./Pages/Postdone";
import ProfileEdit from "./Pages/ProfileEdit";
import ArtworkManagement from "./Pages/ArtworkManagement";
import ServiceWithdrawal from "./Pages/ServiceWithdrawal";
import Work from "./Pages/Work";

function App() {
  const [login, setLogin] = useState(false);
  const [mega, setMega] = useState(false);
  const [count, setCount] = useState(3); // 인물 수
  const [infos, setInfos] = useState([]); // 인물정보
  const [work, setWork] = useState({
    confirmCheck: true,
    category: "책",
    genre: "공포,호러",
    author: "김땡땡,윤땡땡",
    imageUrl: "",
    memberId: 1,
    publisherName: "출판사 이름",
    title: "제목a",
    contents: "책 설명이 적혀있습니다",
    publisherDate: "2024-07-08T10:15:30",
    version: 0.2,
    versionName: "2화",
    casts: [
      {
        name: "등장인물1",
        imageUrl: "",
        type: "사람",
        role: "주연",
        gender: "남자",
        age: 13,
        mbti: "infj",
        contents: "오징어",
      },
      {
        name: "등장인물2",
        imageUrl: "캐릭터 이미지2",
        type: "사람",
        role: "조연",
        gender: "여자",
        age: 25,
        mbti: "enfp",
        contents: "캐릭터 간단 설명2",
      },
      {
        name: "등장인물3",
        imageUrl: "캐릭터 이미지3",
        type: "사람",
        role: "악역",
        gender: "남자",
        age: 45,
        mbti: "intj",
        contents: "캐릭터 간단 설명3",
      },
      {
        name: "등장인물4",
        imageUrl: "캐릭터 이미지4",
        type: "동물",
        role: "조연",
        gender: "여자",
        age: 3,
        mbti: "istp",
        contents: "캐릭터 간단 설명4",
      },
      {
        name: "등장인물5",
        imageUrl: "캐릭터 이미지5",
        type: "외계인",
        role: "주연",
        gender: "남자",
        age: 100,
        mbti: "isfj",
        contents: "캐릭터 간단 설명5",
      },
      {
        name: "등장인물6",
        imageUrl: "",
        type: "사람",
        role: "주연",
        gender: "남자",
        age: 13,
        mbti: "infj",
        contents: "오징어",
      },
    ],
    relationship: {
      nodes: [
        {
          id: "0",
          type: "custom",
          position: {
            x: 432.9676066261984,
            y: 482.5889887340776,
          },
          data: {
            id: 0,
            name: "",
            species: "",
            gender: "",
            age: "",
            personality: "",
            otherInfo: "",
            img: null,
          },
          width: 11,
          height: 50,
          selected: false,
          positionAbsolute: {
            x: 432.9676066261984,
            y: 482.5889887340776,
          },
          dragging: false,
        },
        {
          id: "1",
          type: "custom",
          position: {
            x: 567.7896291580435,
            y: 606.964404506369,
          },
          data: {
            id: 1,
            name: "",
            species: "",
            gender: "",
            age: "",
            personality: "",
            otherInfo: "",
            img: null,
          },
          width: 11,
          height: 50,
          selected: false,
          positionAbsolute: {
            x: 567.7896291580435,
            y: 606.964404506369,
          },
          dragging: false,
        },
        {
          id: "2",
          type: "custom",
          position: {
            x: 673.8834831011162,
            y: 484.9740108658574,
          },
          data: {
            id: 2,
            name: "",
            species: "",
            gender: "",
            age: "",
            personality: "",
            otherInfo: "",
            img: null,
          },
          width: 11,
          height: 50,
          selected: false,
          positionAbsolute: {
            x: 673.8834831011162,
            y: 484.9740108658574,
          },
          dragging: false,
        },
      ],
      viewport: {
        x: -264.8885094017953,
        y: -354.5292065749986,
        zoom: 1.1486983549970349,
      },
      edges: [
        {
          style: {
            strokeWidth: 2,
            stroke: "black",
          },
          type: "floating",
          markerEnd: {
            type: "arrowclosed",
            color: "black",
          },
          source: "0",
          sourceHandle: null,
          target: "1",
          targetHandle: null,
          data: {
            text: "",
          },
          id: "reactflow__edge-0-1",
          selected: false,
        },
        {
          style: {
            strokeWidth: 2,
            stroke: "black",
          },
          type: "floating",
          markerEnd: {
            type: "arrowclosed",
            color: "black",
          },
          source: "2",
          sourceHandle: null,
          target: "1",
          targetHandle: null,
          data: {
            text: "",
          },
          id: "reactflow__edge-2-1",
          selected: false,
        },
      ],
    },
  });

  const [edgeType, setEdgetype] = useState("직선"); // 직선 / 곡선
  const [lineStyle, setLine] = useState("실선"); // 실선 / 점선
  return (
    <Router>
      <Navbar login={login} mega={mega} setMega={setMega} />
      <Routes>
        <Route path="/" element={<Home mega={mega} setMega={setMega} />} />
        <Route
          path="/category1"
          element={
            <Post
              count={count}
              setCount={setCount}
              infos={infos}
              setInfos={setInfos}
              work={work}
              setWork={setWork}
              edgeType={edgeType}
              setEdgetype={setEdgetype}
              lineStyle={lineStyle}
              setLine={setLine}
            />
          }
        />
        <Route path="/category1/postdone" element={<Postdone />} />
        <Route path="/category2" element={<MypageLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route
          path="/work"
          element={
            <Work
              count={count}
              infos={infos}
              work={work}
              edgeType={edgeType}
              lineStyle={lineStyle}
            />
          }
        ></Route>
        <Route path="/category2/*" element={<MypageLayout />}>
          <Route path="edit-profile" element={<ProfileEdit />} />
          <Route path="manage-artworks" element={<ArtworkManagement />} />
          <Route path="delete-service" element={<ServiceWithdrawal />} />
        </Route>
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
