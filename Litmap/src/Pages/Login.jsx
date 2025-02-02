import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "./axiosInstance";
import { useStore } from "../Asset/store";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fbf9f6;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbf9f6;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbf9f6;
`;

const LoginBox = styled.div`
  width: 400px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 15px;
`;

const InputLabel = styled.div`
  font-size: 14px;
  color: #000;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #dadada;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const PasswordContainer = styled.div`
  width: 100%;
  position: relative;
`;

const PasswordInput = styled(InputBox)`
  padding-right: 40px;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 30%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #dadada;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  background-color: #e7c6ce;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #8b0000;
  }
`;

const OrText = styled.div`
  margin: 20px 0;
  color: #7d7d7d;
`;

const SignUpButton = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 45px;
  background-color: transparent;
  border: 1px solid #8b0024;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ResetPasswordLink = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
`;

const ResetLink = styled(Link)`
  color: #7d7d7d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ setLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});
    if (cookies["litmapEmail"]) {
      setLogin(true);
      navigate("/");
    }
  }, [setLogin, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const result = await axiosInstance.post("/members/login", {
        litmapEmail: email,
        password: password,
      });
      console.log(result);

      setLogin(true);

      // 로그인 성공 후 쿠키 설정 (7일 동안 유효)
      setCookie("litmapEmail", email, 7);
      setCookie("userId", result.data.result.id, 7);
      setCookie("memberRoleStatus", result.data.result.memberRoleStatus, 7);

      // 쿠키 설정 확인
      console.log("Cookies:", document.cookie);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("로그인 실패: " + error.message);
    }
  };

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  return (
    <PageContainer>
      <LeftPanel>
        <Logo>
          <img src="/login_logo.png" alt="로고" width="200px" />
        </Logo>
      </LeftPanel>

      <RightPanel>
        <LoginBox>
          <LoginTitle>로그인</LoginTitle>

          <InputLabel>아이디(이메일)</InputLabel>
          <InputBox
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputLabel>비밀번호</InputLabel>
          <PasswordContainer>
            <PasswordInput
              type={passwordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TogglePasswordButton
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordButton>
          </PasswordContainer>

          <LoginButton onClick={handleLogin}>로그인</LoginButton>

          <ResetPasswordLink>
            <ResetLink to="/find-id">아이디 찾기</ResetLink>
            <span>|</span>
            <ResetLink to="/reset-password">비밀번호 찾기</ResetLink>
          </ResetPasswordLink>

          <OrText>또는</OrText>

          <SignUpButton to="/signup">이메일로 회원가입</SignUpButton>
        </LoginBox>
      </RightPanel>
    </PageContainer>
  );
};

export default Login;
