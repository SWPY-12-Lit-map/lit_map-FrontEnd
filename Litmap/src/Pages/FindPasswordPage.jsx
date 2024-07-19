import React, { useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #FBF9F6;
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
    background-color: #FFFFFF;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 400px;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`;

const SubTitle = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
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
    border: 1px solid #DADADA;
    border-radius: 5px;
    font-size: 14px;
`;

const FullWidthButton = styled.button`
    width: 100%;
    background-color: #E7C6CE;
    color: white;
    padding: 10px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
        background-color: #8B0024;
    }
`;

const Footer = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color: #7D7D7D;
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    margin: 20px auto;
`;

const FindPasswordPage = () => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");

    const handleFindPasswordClick = () => {
        // 비밀번호 재설정 API 호출 로직을 여기에 추가
        console.log("비밀번호 재설정 요청:", { name, company, email });
        setStep(2);
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
