import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Mypage from "./Pages/Mypage";
import AdminPage from "./Pages/AdminPage";
import Postdone from "./Pages/Postdone";

function App() {
  const [mega, setMega] = useState(false);
  return (
    <Router>
      <Navbar mega={mega} setMega={setMega} />
      <Routes>
        <Route path="/" element={<Home mega={mega} setMega={setMega} />} />
        <Route path="/category1" element={<Post />}>
          {" "}
        </Route>
        <Route path="/category1/postdone" element={<Postdone />}></Route>

        <Route path="/category2" element={<Mypage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/adminpage" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
