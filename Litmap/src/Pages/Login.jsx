import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 15px;
`;

const InputLabel = styled.div`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 5px;
  text-align: left;
  width: 300px;
`;

const InputBox = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #ccc;
  }
`;

const OrText = styled.div`
  margin: 20px 0;
  color: #ccc;
`;

const SignUpButton = styled(Link)`
  display: inline-block;
  width: 300px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #ccc;
  color: black;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  margin-bottom: 15px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ResetPasswordButton = styled.button`
  background-color: transparent;
  border: none;
  color: black;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  return (
    <PageContainer>
      <LeftPanel>
        <LogoImg src="/Logo.png" alt="로고" />
      </LeftPanel>

      <RightPanel>
        <LoginTitle>로그인</LoginTitle>

        <InputLabel>아이디(이메일)</InputLabel>
        <InputBox type="email" placeholder="이메일을 입력해주세요." />

        <InputLabel>비밀번호</InputLabel>
        <InputBox type="password" placeholder="비밀번호를 입력해주세요." />

        <LoginButton
          onClick={() => {
            setLogin(true);
          }}
        >
          로그인
        </LoginButton>

        <OrText>또는</OrText>

        <SignUpButton to="/signup">이메일로 회원가입하기</SignUpButton>
        <ResetPasswordButton>비밀번호 재설정</ResetPasswordButton>
      </RightPanel>
    </PageContainer>
  );
};

export default LoginPage;
