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

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Router>
      <Navbar login={login} />
      <Routes>
        <Route path="/" element={<Home mega={mega} setMega={setMega} />} />
        <Route path="/category1" element={<Post />} />
        <Route path="/category1/postdone" element={<Postdone />} />
        <Route path="/category2" element={<MypageLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
