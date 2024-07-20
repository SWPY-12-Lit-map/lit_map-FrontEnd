import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    margin-bottom: 20px;
`;

const BoxContainerCentered = styled(BoxContainer)`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const SubTitle = styled.p`
    font-size: 16px;
    margin-bottom: 1px;
`;

const SubTitle2 = styled.p`
    font-size: 12px;
    margin-bottom: 1px;
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

const FullWidthButton2 = styled.button`
    width: 100%;
    color: #8B0024;
    background-color: white;
    padding: 10px 0;
    border: 1px solid #000000;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
        text-decoration: underline;
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

const LibraryImage = styled.img`
    margin-top: 20px;
    width: 200px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin: 5px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
`;

const InputFieldWithButton = styled.div`
    position: relative;
    width: 100%;
`;

const Button = styled.button`
    position: absolute;
    right: 0;
    top: 45%;
    right: 2%;
    transform: translateY(-50%);
    padding: 5px;
    background-color: #F4F4F5;
    color: #CECED0;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #8B0024;
        color: white;
    }
`;

const SmallText = styled.p`
    font-size: 12px;
    color: #7D7D7D;
    margin-top: -10px;
    margin-bottom: 10px;
`;

const SmallText2 = styled.p`
    font-size: 12px;
    color: #7D7D7D;
    margin-top: 1px;
    margin-bottom: 5px;
`;

const InfoBox = styled.div`
    border: none;
    border-radius: 8px;
    padding: 10px;
    background-color: #F4F4F5;
    color: #282828;
    font-size: 14px;
    margin-top: 20px;
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        workEmail: '',
        workURL: ''
    });
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNextClick = async () => {
        if (step === 1) {
            if (selectedOption) {
                setStep(2);
                setValidationFailed(false);
            } else {
                setValidationFailed(true);
            }
        } else if (step === 2) {
            let allFieldsFilled = false;
    
            if (selectedOption === 'writer') {
                allFieldsFilled = formData.name && formData.email && formData.password && formData.confirmPassword && formData.nickname && formData.workEmail && formData.workURL;
            } else {
                allFieldsFilled = formData.name && formData.email && formData.password && formData.confirmPassword && formData.nickname && formData.workEmail && formData.workURL;
            }
    
            if (allFieldsFilled) {
                if (formData.password !== formData.confirmPassword) {
                    setValidationFailed(true);
                    setApiError('Passwords do not match.');
                    return;
                }
                console.log('Form Data at Step 2:', formData);
                setStep(3);
                setValidationFailed(false);
            } else {
                setValidationFailed(true);
            }
        } else if (step === 3) {
            if (terms.spoilerAgreement && terms.age && terms.termsOfService && terms.privacyPolicy) {
                setValidationFailed(false);
                const success = await handleSubmit();
                if (success) {
                    setStep(4);
                }
            } else {
                setValidationFailed(true);
            }
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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

    const handleLibraryClick = () => {
        window.location.href = "/";
    };

    const handleRegisterClick = () => {
        window.location.href = "/category1";
    };

    const handleSubmit = async () => {
        const payload = {
            litmapEmail: formData.email,
            workEmail: formData.workEmail,
            name: formData.name,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            nickname: formData.nickname,
            memberRoleStatus: selectedOption.toUpperCase()
        };
    
        console.log('Payload:', payload); // 서버로 전송할 데이터를 콘솔에 출력
    
        try {
            const response = await axios.post('/api/members/register', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response); // 서버 응답을 콘솔에 출력
            return true;
        } catch (error) {
            console.error('There was an error!', error);
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Data:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            setApiError('An error occurred during registration. Please try again.');
            return false;
        }
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

            {step === 2 && selectedOption !== 'writer' && (
                <>
                    <BoxContainer>
                        <Title>기본 정보</Title>

                        <label>이름</label>
                        <InputField 
                            type="text" 
                            name="name" 
                            placeholder="이름을 입력해주세요." 
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <label>이메일</label>
                        <InputFieldWithButton>
                            <InputField 
                                type="email" 
                                name="email" 
                                placeholder="이메일을 입력해주세요." 
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Button onClick={() => handleValidationCheck('email')}>중복확인</Button>
                        </InputFieldWithButton>

                        <label>비밀번호</label>
                        <InputField 
                            type="password" 
                            name="password" 
                            placeholder="비밀번호를 입력해주세요." 
                            value={formData.password}
                            onChange={handleInputChange}
                        />

                        <label>비밀번호 확인</label>
                        <InputField 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="비밀번호를 다시 한번 입력해주세요." 
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <SmallText>영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.</SmallText>
                        
                        <label>닉네임</label>
                        <InputFieldWithButton>
                            <InputField 
                                type="text" 
                                name="nickname" 
                                placeholder="닉네임을 입력해주세요." 
                                value={formData.nickname}
                                onChange={handleInputChange}
                            />
                            <Button onClick={() => handleValidationCheck('nickname')}>중복확인</Button>
                        </InputFieldWithButton>
                    </BoxContainer>
                    <BoxContainer>
                        <Title>사업자 정보</Title>

                        <label>업무용 이메일</label>
                        <SmallText2>업무용으로 쓰는 이메일을 추가 등록해주세요.</SmallText2>
                        <InputField 
                            type="email" 
                            name="workEmail" 
                            placeholder="이메일을 입력해주세요." 
                            value={formData.workEmail}
                            onChange={handleInputChange}
                        />

                        <label>작품정보(국문 또는 영문)</label>
                        <SmallText2>작품의 정보가 나와있는 사이트나 판매처의 URL을 입력해주세요.</SmallText2>
                        <InputField 
                            type="text" 
                            name="workURL" 
                            placeholder="http://www.litmap.com" 
                            value={formData.workURL}
                            onChange={handleInputChange}
                        />
                        
                        <FullWidthButton onClick={handleNextClick}>다음</FullWidthButton>
                        {validationFailed && (
                            <ErrorMessage>모든 정보가 채워져야 합니다.</ErrorMessage>
                        )}
                    </BoxContainer>
                    <Footer>릿맵 | 02 |</Footer>
                </>
            )}

            {step === 2 && selectedOption === 'writer' && (
                <>
                    <BoxContainer>
                        <Title>기본 정보</Title>

                        <label>이름</label>
                        <InputField 
                            type="text" 
                            name="name" 
                            placeholder="이름을 입력해주세요." 
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                        <label>이메일</label>
                        <InputFieldWithButton>
                            <InputField 
                                type="email" 
                                name="email" 
                                placeholder="이메일을 입력해주세요." 
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {/* <Button onClick={() => handleValidationCheck('email')}>중복확인</Button> */}
                        </InputFieldWithButton>

                        <label>비밀번호</label>
                        <InputField 
                            type="password" 
                            name="password" 
                            placeholder="비밀번호를 입력해주세요." 
                            value={formData.password}
                            onChange={handleInputChange}
                        />

                        <label>비밀번호 확인</label>
                        <InputField 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="비밀번호를 다시 한번 입력해주세요." 
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <SmallText>영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.</SmallText>
                        
                        <label>닉네임</label>
                        <InputFieldWithButton>
                            <InputField 
                                type="text" 
                                name="nickname" 
                                placeholder="닉네임을 입력해주세요." 
                                value={formData.nickname}
                                onChange={handleInputChange}
                            />
                            {/* <Button onClick={() => handleValidationCheck('nickname')}>중복확인</Button> */}
                        </InputFieldWithButton>
                    </BoxContainer>
                    <BoxContainer>
                        <Title>1인작가 정보</Title>

                        <label>업무용 이메일</label>
                        <SmallText2>업무용으로 쓰는 이메일을 추가 등록해주세요.</SmallText2>
                        <InputField 
                            type="email" 
                            name="workEmail" 
                            placeholder="이메일을 입력해주세요." 
                            value={formData.workEmail}
                            onChange={handleInputChange}
                        />

                        <label>작품정보(국문 또는 영문)</label>
                        <SmallText2>작품의 정보가 나와있는 사이트나 판매처의 URL을 입력해주세요.</SmallText2>
                        <InputField 
                            type="text" 
                            name="workURL" 
                            placeholder="http://www.litmap.com" 
                            value={formData.workURL}
                            onChange={handleInputChange}
                        />

                        <InfoBox>
                            <SubTitle>1인 작가 가입 안내사항</SubTitle>
                            <SubTitle2>1인 작가의 경우 별도의 관리자 승인이 필요함으로</SubTitle2>
                            <SubTitle2>가입 정보 작성 후 승인까지 1~3일이 소요될 수 있습니다.</SubTitle2>
                        </InfoBox>

                        <FullWidthButton onClick={handleNextClick}>다음</FullWidthButton>
                        {validationFailed && (
                            <ErrorMessage>모든 정보가 채워져야 합니다.</ErrorMessage>
                        )}
                    </BoxContainer>
                    <Footer>릿맵 | 02 |</Footer>
                </>
            )}

            {step === 3 && (
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
                    <Footer>릿맵 | 03 |</Footer>
                </>
            )}

            {step === 4 && (
                <>
                    <BoxContainerCentered>
                        <Title>환영합니다!</Title>
                        <SubTitle>릿맵에 가입이 완료되었습니다.</SubTitle>
                        <br />
                        {selectedOption === 'writer' ? (
                            <>
                                <SubTitle>승인 절차는 약 1~3일 정도 소요되며,</SubTitle>
                                <SubTitle>승인 완료 시 확인 메일을 발송해드립니다.</SubTitle>
                                <LibraryImage src="/library.png" alt="Library" />
                                <ButtonContainer>
                                    <FullWidthButton onClick={handleLibraryClick}>작품 둘러보기</FullWidthButton>
                                </ButtonContainer>
                            </>
                        ) : (
                            <>
                                <SubTitle>이제부터 릿맵과 함께</SubTitle>
                                <SubTitle>작품의 완성을 함께해요.</SubTitle>
                                <LibraryImage src="/library.png" alt="Library" />
                                <ButtonContainer>
                                    <FullWidthButton2 onClick={handleLibraryClick}>작품 둘러보기</FullWidthButton2>
                                    <FullWidthButton onClick={handleRegisterClick}>작품 등록하기</FullWidthButton>
                                </ButtonContainer>
                            </>
                        )}
                    </BoxContainerCentered>
                    <Footer>릿맵 | 04 |</Footer>
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
