import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fbf9f6;
`;

const Logo = styled.div`
  margin-top: 50px;
  text-align: center;

  img {
    width: 100px;
  }
`;

const Title = styled.h1`
  color: #575757;
  margin-top: 20px;
  font-size: 24px;
`;

const BoxContainer = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const SubTitle = styled.p`
  font-size: 16px;
  margin-bottom: 1px;
  text-align: center;
`;

const HighlightedText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const OptionTitle = styled.h2`
  font-size: 14px;
  margin-bottom: 5px;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #dadada;
  border-radius: 5px;
  font-size: 14px;
`;

const FullWidthButton = styled.button`
  width: 100%;
  background-color: #e7c6ce;
  color: white;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #8b0024;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #7d7d7d;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px auto;
`;

const Blank = styled.div`
  margin-bottom: 20px;
`;

const FindPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleFindPasswordClick = async () => {
    try {
      const passwordResponse = await axios.post("https://api.litmap.store/api/email/find-password", {
        memberId: 0,  // memberId는 백엔드에서 시큐리티 수정되면 테스트하면서 바꾸기
        email: email,
        address: "",
        title: "임시 비밀번호 발급",
        message: "임시 비밀번호가 발급되었습니다.",
      });

      if (passwordResponse.data) {
        console.log("비밀번호 재설정 요청 성공:", passwordResponse.data);
        setStep(2);
      } else {
        setError("비밀번호 재설정 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 재설정 요청 오류:", error);
      setError("비밀번호 재설정 요청 중 오류가 발생했습니다.");
    }
  };

  const handleLoginClick = () => {
    // 로그인 페이지로 이동하는 로직을 여기에 추가
    window.location.href = "/login";
  };

  return (
    <PageContainer>
      <Logo>
        <img src="/Logo.png" alt="로고" />
      </Logo>
      <Title>비밀번호 찾기</Title>

      {step === 1 && (
        <BoxContainer>
          <SubTitle>회원 가입 시 등록했던</SubTitle>
          <SubTitle>
            <HighlightedText>가입정보</HighlightedText>를 입력해주세요.
          </SubTitle>

          <Blank></Blank>

          <div>
            <OptionTitle>이름</OptionTitle>
            <Input
              type="text"
              placeholder="가입자의 이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <OptionTitle>회사명(국문 또는 영문)</OptionTitle>
            <Input
              type="text"
              placeholder="회사명을 입력해주세요."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <OptionTitle>아이디</OptionTitle>
            <Input
              type="email"
              placeholder="아이디를 이메일 형식으로 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <FullWidthButton onClick={handleFindPasswordClick}>비밀번호 재설정</FullWidthButton>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </BoxContainer>
      )}

      {step === 2 && (
        <BoxContainer>
          <SubTitle>가입한 이메일 주소로</SubTitle>
          <SubTitle>
            <HighlightedText>임시 비밀번호</HighlightedText>를 발송하였습니다.
          </SubTitle>
          <Image src="/send.png" alt="발송 이미지" />
          <FullWidthButton onClick={handleLoginClick}>로그인 하기</FullWidthButton>
        </BoxContainer>
      )}

      <Footer>릿맵 | {step === 1 ? "01" : "02"} |</Footer>
    </PageContainer>
  );
};

export default FindPasswordPage;
