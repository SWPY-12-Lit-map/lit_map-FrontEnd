import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #FBF9F6;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FBF9F6;
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
  background-color: #FBF9F6;
`;

const LoginBox = styled.div`
  width: 400px;
  background-color: #FFFFFF;
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
  color: #black;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #DADADA;
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
  color: #DADADA;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  background-color: #E7C6CE;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #8B0000;
  }
`;

const OrText = styled.div`
  margin: 20px 0;
  color: #7D7D7D;
`;

const SignUpButton = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 45px;
  background-color: transparent;
  border: 1px solid #8B0024;
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
  color: #7D7D7D;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 임시 로그인 로직 (API 호출 부분) -> 이 부분 나중에 수정!
    try {
      // 임시로 API 호출하는 부분을 설정
      const response = await fetch("https://example/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "로그인에 실패했습니다.");
      }

      const data = await response.json();

      // 로그인 성공 시 메인 페이지로 이동
      navigate("/");
    } catch (error) {
      alert(error.message || "로그인 도중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
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

export default LoginPage;
