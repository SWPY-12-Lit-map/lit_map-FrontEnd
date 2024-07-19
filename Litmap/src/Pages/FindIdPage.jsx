import React, { useState } from "react";
import styled, { css } from "styled-components";

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
    height: 65vh;
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

const LeftAlignedText = styled.p`
    font-size: 12px;
    margin-bottom: 10px;
    text-align: left;
`;

const HighlightedText = styled.span`
    font-size: 18px;
    font-weight: bold;
`;

const OptionGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
`;

const OptionBox = styled.div`
    background-color: #FFFFFF;
    border: 1px solid #F7F7F7;
    padding: 20px;
    border-radius: 14px;
    text-align: left;
    cursor: pointer;

    ${(props) =>
        props.selected &&
        css`
        border-color: #8B0024;
        color: #8B0024;

        & .option-image-wrapper {
            background-color: #8B0024;
        }
        `}
`;

const OptionImageWrapper = styled.div`
    width: 50px;
    height: 50px;
    background-color: #9F9F9F;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const OptionImage = styled.img`
    width: 30px;
    height: 30px;
`;

const OptionTitle = styled.h2`
    font-size: 14px;
    margin-bottom: 5px;
    text-align: left;
`;

const OptionDescription = styled.p`
    font-size: 14px;
    color: #7D7D7D;
`;

const Footer = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color: #7D7D7D;
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

const Icon = styled.div`
    font-size: 50px;
    margin: 20px 0;

    img {
        width: 100px;
        height: 100px;
    }
`;

const FindIdPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [step, setStep] = useState(1);
    const [userFound, setUserFound] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        setStep(2);
    };

    const handleFindIdClick = () => {
        // API 호출 로직을 여기에 추가
        // 임의의 데이터 넣어둠.
        const fakeApiResponse = {
            success: true, // false로 바꾸면 실패 페이지로 이동
            email: "litmap@gmail.com",
            registrationDate: "2022.07.01",
        };

        if (fakeApiResponse.success) {
            setUserFound(true);
            setUserData(fakeApiResponse);
        } else {
            setUserFound(false);
        }

        setStep(3);
    };

    const handleLoginClick = () => {
        // 로그인 페이지로 이동하는 로직을 여기에 추가
        window.location.href = "/login";
    };

    const handleResetPasswordClick = () => {
        // 비밀번호 재설정 페이지로 이동하는 로직을 여기에 추가
        window.location.href = "/reset-password";
    };

    const handleHomeClick = () => {
        // 홈페이지로 이동하는 로직을 여기에 추가
        window.location.href = "/";
    };

    const handleSignupClick = () => {
        // 회원가입 페이지로 이동하는 로직을 여기에 추가
        window.location.href = "/signup";
    };

    return (
        <PageContainer>
            <Logo>
                <img src="/Logo.png" alt="로고" />
            </Logo>
            <Title>아이디 찾기</Title>
            
            {step === 1 && (
                <>
                    <BoxContainer>
                        <SubTitle>회원 가입 시 선택하였던</SubTitle>
                        <SubTitle>
                            <HighlightedText>회원 유형</HighlightedText>을 선택해주세요.
                        </SubTitle>
                        <OptionGrid>
                            <OptionBox
                                selected={selectedOption === 'representative'}
                                onClick={() => handleOptionClick('representative')}
                            >
                                <OptionImageWrapper className="option-image-wrapper">
                                    <OptionImage src="/representative.png" alt="대표" />
                                </OptionImageWrapper>
                                <OptionTitle>대표</OptionTitle>
                                <OptionDescription>출판사, 제작사 등의 사업자 본인</OptionDescription>
                            </OptionBox>
                            <OptionBox
                                selected={selectedOption === 'staff'}
                                onClick={() => handleOptionClick('staff')}
                            >
                                <OptionImageWrapper className="option-image-wrapper">
                                    <OptionImage src="/staff.png" alt="직원" />
                                </OptionImageWrapper>
                                <OptionTitle>직원</OptionTitle>
                                <OptionDescription>출판사, 제작사 등의 임직원</OptionDescription>
                            </OptionBox>
                            <OptionBox
                                selected={selectedOption === 'writer'}
                                onClick={() => handleOptionClick('writer')}
                            >
                                <OptionImageWrapper className="option-image-wrapper">
                                    <OptionImage src="/writer.png" alt="1인 작가" />
                                </OptionImageWrapper>
                                <OptionTitle>1인 작가</OptionTitle>
                                <OptionDescription>독립, 프리랜서 작가</OptionDescription>
                            </OptionBox>
                            <OptionBox
                                selected={selectedOption === 'cooperation'}
                                onClick={() => handleOptionClick('cooperation')}
                            >
                                <OptionImageWrapper className="option-image-wrapper">
                                    <OptionImage src="/cooperation.png" alt="협력사" />
                                </OptionImageWrapper>
                                <OptionTitle>협력사</OptionTitle>
                                <OptionDescription>출판사, 제작사 등의 파트너사</OptionDescription>
                            </OptionBox>
                        </OptionGrid>
                        <FullWidthButton onClick={handleNextClick}>다음</FullWidthButton>
                    </BoxContainer>
                    <Footer>릿맵 | 01 |</Footer>
                </>
            )}

            {step === 2 && (
                <>
                    <BoxContainer>
                        <SubTitle>회원 가입시 등록했던</SubTitle>
                        <SubTitle>
                            <HighlightedText>가입정보</HighlightedText>를 입력해주세요.
                        </SubTitle>
                        <div>
                            <OptionTitle>이름</OptionTitle>
                            <Input type="text" placeholder="가입자의 이름을 입력해주세요." />
                        </div>
                        <div>
                            <OptionTitle>출판사명(국문 또는 영문)</OptionTitle>
                            <Input type="text" placeholder="출판사명을 입력해주세요." />
                        </div>
                        <div>
                            <OptionTitle>사업자 번호</OptionTitle>
                            <LeftAlignedText>사업자 번호 입력 후 사업자 인증을 진행해주세요.</LeftAlignedText>
                            <Input type="text" placeholder="사업자 등록번호 숫자 10자리를 입력해주세요." />
                        </div>
                        <FullWidthButton onClick={handleFindIdClick}>아이디 찾기</FullWidthButton>
                    </BoxContainer>
                    <Footer>릿맵 | 02 |</Footer>
                </>
            )}

            {step === 3 && (
                <>
                    {userFound ? (
                        <BoxContainer>
                            <SubTitle>릿맵에 등록한</SubTitle>
                            <SubTitle>
                                <HighlightedText>가입 아이디가 확인되었습니다</HighlightedText>.
                            </SubTitle>
                            <div>
                                <HighlightedText>{userData.email}</HighlightedText>
                            </div>
                            <div>
                                <p>가입일자: {userData.registrationDate}</p>
                            </div>
                            <Icon>
                                <img src="/checkmark-circle.png" alt="체크 표시" />
                            </Icon>
                            <FullWidthButton onClick={handleLoginClick}>로그인 하기</FullWidthButton>
                            <FullWidthButton onClick={handleResetPasswordClick}>비밀번호 재설정</FullWidthButton>
                        </BoxContainer>
                    ) : (
                        <BoxContainer>
                            <SubTitle>입력한 회원 정보와 일치하는</SubTitle>
                            <SubTitle>
                                <HighlightedText>아이디가 없습니다</HighlightedText>.
                            </SubTitle>
                            <p>입력한 정보를 다시 확인해주세요.</p>
                            <Icon>
                                <img src="/close-circle.png" alt="엑스 표시" />
                            </Icon>
                            <FullWidthButton onClick={handleHomeClick}>홈으로 가기</FullWidthButton>
                            <FullWidthButton onClick={handleSignupClick}>이메일로 회원가입</FullWidthButton>
                        </BoxContainer>
                    )}
                    <Footer>릿맵 | 03 |</Footer>
                </>
            )}
        </PageContainer>
    );
};

export default FindIdPage;
