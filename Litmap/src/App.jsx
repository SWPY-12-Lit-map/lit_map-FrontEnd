import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MypageLayout from "./Pages/MypageLayout";
import AdminPage from "./Pages/AdminPage";
import Postdone from "./Pages/Postdone";
import ProfileManage from "./Pages/ProfileManage";
import MemberEdit from "./Pages/MemberEdit";
import ArtworkManagement from "./Pages/ArtworkManagement";
import Work from "./Pages/Work";
import ScrollTop from "./Asset/ScrollTop";
import FindIdPage from "./Pages/FindIdPage";
import FindPasswordPage from "./Pages/FindPasswordPage";
// import SearchResult from "./Pages/SearchResult";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`html {
    height: 100%;
  }
    body {
      height: 100%;
      width: 100%;
    }
    #root {
      height: 100%;
    }`;
const Main = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
`;
function App() {
  // 작품 가져오기
  const [state, setState] = useState(false);
  const [view, setView] = useState([]);
  const [update, setUpdate] = useState([]);
  const [num, setNum] = useState(0);
  const [dataState, setDataState] = useState(false);
  const [workId, setWorkId] = useState([]);

  const updateOrder = async (i) => {
    await axios
      .get(`https://api.litmap.store/api/board/updateList?pn=${i}`)
      .then((result) => {
        const data = result.data.result.content;
        setUpdate((prevUpdate) => [...prevUpdate, ...data]);
        setDataState(result.data.result.last);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewOrder = async (i) => {
    await axios
      .get(`https://api.litmap.store/api/board/view?pn=${i}`)
      .then((result) => {
        const data = result.data.result.content;
        setView((prevView) => [...prevView, ...data]);
        setDataState(result.data.result.last);
        const dataId = data[0].workId;

        setWorkId([...workId, dataId]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAxios = async () => {
    if (!dataState) {
      setNum(num + 1);
      await updateOrder(num);
      await viewOrder(num);
    } else {
      null;
    }
  };

  useEffect(() => {
    getAxios();
  }, [num]);

  const [login, setLogin] = useState(false);
  const [mega, setMega] = useState(false);

  const date = new Date();
  const [count, setCount] = useState(3); // 인물 수
  const [characterInfos, setInfos] = useState([]); // 인물정보
  const [work, setWork] = useState({
    confirmCheck: false,
    category: "1", // 책이나 영화 뭐 이런거
    genre: "1", // 장르
    author: "1", // 작가
    imageUrl: "1", // 썸넬 이미지
    memberId: 1, // 작성자 id
    title: "1", // 제목
    contents: "1", // 설명
    publisherDate: date, // 출판일자
    version: 0.1, // 시스템 버전
    versionName: "1화", // 작성자 임의 버전
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
    relationship: {
      // 마인드맵 그대로
    },
  }); // 백엔드 api 양식
  const [read, setRead] = useState(false);

  useEffect(() => {
    const infosChange = { ...work, casts: characterInfos };
    setWork(infosChange);
  }, [characterInfos]);

  const [edgeType, setEdgetype] = useState("직선"); // 직선 / 곡선
  const [lineStyle, setLine] = useState("실선"); // 실선 / 점선

  return (
    <Router>
      <Navbar login={login} setLogin={setLogin} />
      <ScrollTop />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              mega={mega}
              setMega={setMega}
              update={update}
              state={state}
              setState={setState}
              view={view}
            />
          }
        />
        <Route
          path="/category1"
          element={
            <Post
              count={count}
              setCount={setCount}
              characterInfos={characterInfos}
              setInfos={setInfos}
              work={work}
              setWork={setWork}
              edgeType={edgeType}
              setEdgetype={setEdgetype}
              lineStyle={lineStyle}
              setLine={setLine}
              read={read}
              setRead={setRead}
            />
          }
        />
        <Route path="/category1/postdone" element={<Postdone />} />
        <Route path="/category2" element={<MypageLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route
          path={`/work/:id`}
          element={
            <Work
              count={count}
              characterInfos={characterInfos}
              work={work}
              edgeType={edgeType}
              lineStyle={lineStyle}
              read={read}
              setRead={setRead}
            />
          }
        ></Route>
        <Route path="/category2/*" element={<MypageLayout />}>
          <Route path="manage-profile" element={<ProfileManage />} />
          <Route path="edit-member" element={<MemberEdit />} />
          <Route path="manage-artworks" element={<ArtworkManagement />} />
        </Route>
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/find-id" element={<FindIdPage />} />
        <Route path="/reset-password" element={<FindPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
