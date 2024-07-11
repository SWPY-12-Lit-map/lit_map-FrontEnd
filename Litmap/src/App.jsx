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
import ScrollTop from "./Asset/ScrollTop";

function App() {
  const [login, setLogin] = useState(false);
  const [mega, setMega] = useState(false);
  const [count, setCount] = useState(3); // 인물 수
  const [infos, setInfos] = useState([]); // 인물정보
  const [work, setWork] = useState({
    confirmCheck: false,
    category: "",
    genre: "",
    author: "",
    imageUrl: "",
    memberId: "",
    publisherName: "",
    title: "",
    contents: "",
    publisherDate: "",
    version: 0.1,
    versionName: "",
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

  const [edgeType, setEdgetype] = useState("직선"); // 직선 / 곡선
  const [lineStyle, setLine] = useState("실선"); // 실선 / 점선
  return (
    <Router>
      <Navbar login={login} mega={mega} setMega={setMega} />
      <ScrollTop />
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
