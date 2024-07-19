import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Modal from 'react-modal';

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
    text-align: left;
    width: 400px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
`;

const SubTitle = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
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
    text-align: center;
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

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #7D7D7D;
    width: 100%;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const WarningMessage = styled.div`
    color: #FF0000;
    font-size: 11px;
    margin-left: 20px;
`;

const Dropdown = styled.div`
    cursor: pointer;
    color: #7D7D7D;
`;

const Blank = styled.div`
    margin-bottom: 10px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    border: 2px solid #9F9F9F;
    cursor: pointer;
    margin-right: 10px;
    position: relative;
    display: inline-block;

    &:checked::before {
        content: '';
    }
`;

const ErrorMessage = styled.div`
    color: #FF0000;
    font-size: 14px;
    margin-top: 10px;
`;

const CloseButton = styled.button`
    background-color: #8B0024;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 20px;

    &:hover {
        background-color: #E7C6CE;
    }
`;

const SignupPage = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [step, setStep] = useState(1);
    const [terms, setTerms] = useState({
        spoilerAgreement: false,
        allAgreement: false,
        age: false,
        termsOfService: false,
        privacyPolicy: false,
    });
    const [showTerms, setShowTerms] = useState({
        spoiler: false,
        termsOfService: false,
        privacyPolicy: false,
    });
    const [validationFailed, setValidationFailed] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        if (step === 1) {
            if (selectedOption) {
                setStep(2);
                setValidationFailed(false);
            } else {
                setValidationFailed(true);
            }
        } else if (step === 2) {
            if (terms.spoilerAgreement && terms.age && terms.termsOfService && terms.privacyPolicy) {
                setValidationFailed(false);
                window.location.href = "/";
            } else {
                setValidationFailed(true);
            }
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTerms((prevTerms) => {
            const newTerms = {
                ...prevTerms,
                [name]: checked,
            };

            if (name === "allAgreement") {
                newTerms.age = checked;
                newTerms.termsOfService = checked;
                newTerms.privacyPolicy = checked;
            }

            return newTerms;
        });
    };

    const handleDropdownClick = async (term, title) => {
        const response = await fetch(`/${term}.txt`);
        const content = await response.text();
        setModalContent(content);
        setModalTitle(title);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <PageContainer>
            <Logo>
                <img src="/Logo.png" alt="로고" />
            </Logo>
            <Title>회원가입</Title>

            {step === 1 && (
                <>
                    <BoxContainer>
                        <SubTitle>안녕하세요! 릿맵에 오신걸 환영합니다.</SubTitle>
                        <SubTitle>릿맵의 회원은</SubTitle>
                        <SubTitle>
                            <HighlightedText>콘텐츠 공급자와 창작자만</HighlightedText> 가입이 가능합니다.
                        </SubTitle>
                        <br />
                        <SubTitle>회원가입을 진행하기를 원하시면</SubTitle>
                        <SubTitle>회원 구분을 먼저 선택해주세요.</SubTitle>

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
                        {validationFailed && (
                            <ErrorMessage>회원 구분을 선택해 주세요.</ErrorMessage>
                        )}
                    </BoxContainer>
                    <Footer>릿맵 | 01 |</Footer>
                </>
            )}

            {step === 2 && (
                <>
                    <BoxContainer>
                        <SubTitle>릿맵 <HighlightedText>이용 약관에 동의</HighlightedText>하시면</SubTitle>
                        <SubTitle>가입이 완료됩니다.</SubTitle>
                        <br />
                        <CheckboxContainer>
                            <CheckboxWrapper>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        name="spoilerAgreement"
                                        checked={terms.spoilerAgreement}
                                        onChange={handleCheckboxChange}
                                    />
                                    <CheckboxLabel>릿맵 스포일러 방지 및 이용 동의 (필수)</CheckboxLabel>
                                </div>
                                <Dropdown onClick={() => handleDropdownClick("spoiler", "스포일러 방지 및 이용 동의 (필수)")}>
                                    &gt;
                                </Dropdown>
                            </CheckboxWrapper>
                            <WarningMessage>스포일러에 대한 내용이 있는 게시물은 사전 경고 없이 삭제될 수 있고</WarningMessage>
                            <WarningMessage>법적인 조치를 취할 수 있습니다.</WarningMessage>
                        </CheckboxContainer>
                        <Blank></Blank>
                        <CheckboxContainer>
                            <CheckboxWrapper>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        name="allAgreement"
                                        checked={terms.allAgreement}
                                        onChange={handleCheckboxChange}
                                    />
                                    <CheckboxLabel>전체 동의</CheckboxLabel>
                                </div>
                            </CheckboxWrapper>
                        </CheckboxContainer>
                        <CheckboxContainer>
                            <CheckboxWrapper>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        name="age"
                                        checked={terms.age}
                                        onChange={handleCheckboxChange}
                                    />
                                    <CheckboxLabel>만 14세 이상입니다.(필수)</CheckboxLabel>
                                </div>
                            </CheckboxWrapper>
                        </CheckboxContainer>
                        <CheckboxContainer>
                            <CheckboxWrapper>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        name="termsOfService"
                                        checked={terms.termsOfService}
                                        onChange={handleCheckboxChange}
                                    />
                                    <CheckboxLabel>릿맵 이용약관 동의 (필수)</CheckboxLabel>
                                </div>
                                <Dropdown onClick={() => handleDropdownClick("termsofservice", "릿맵 이용약관 동의 (필수)")}>
                                    &gt;
                                </Dropdown>
                            </CheckboxWrapper>
                        </CheckboxContainer>
                        <CheckboxContainer>
                            <CheckboxWrapper>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        name="privacyPolicy"
                                        checked={terms.privacyPolicy}
                                        onChange={handleCheckboxChange}
                                    />
                                    <CheckboxLabel>릿맵 개인정보 수집 및 이용 동의(필수)</CheckboxLabel>
                                </div>
                                <Dropdown onClick={() => handleDropdownClick("privacypolicy", "릿맵 개인정보 수집 및 이용 동의 (필수)")}>
                                    &gt;
                                </Dropdown>
                            </CheckboxWrapper>
                        </CheckboxContainer>
                        <FullWidthButton onClick={handleNextClick}>회원가입 완료</FullWidthButton>
                        {validationFailed && (
                            <ErrorMessage>모든 필수 항목에 동의해야 합니다.</ErrorMessage>
                        )}
                    </BoxContainer>
                    <Footer>릿맵 | 02 |</Footer>
                </>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Terms and Conditions"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    },
                }}
            >
                <h2>{modalTitle}</h2>
                <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{modalContent}</pre>
                <CloseButton onClick={closeModal}>닫기</CloseButton>
            </Modal>
        </PageContainer>
    );
};

export default SignupPage;
