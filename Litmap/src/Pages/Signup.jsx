import React, { useState } from 'react';
import styled from 'styled-components';

const SignupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormWrapper = styled.div`
    background-color: #fff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    border: 2px solid #800020;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const Description = styled.p`
    font-size: 14px;
    margin-bottom: 8px;
    text-align: left;
    color: #999999;
`;

const HighlightDescription = styled.span`
    font-size: 16px;
    color: #000;
    font-weight: bold;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 20px 0;
    height: 80px;
    width: 45%;
    background-color: ${({ active }) => (active ? '#800020' : 'white')};
    color: ${({ active }) => (active ? '#fff' : '#D9D9D9')};
    border: 1px solid #800020;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
`;

const ContinueButton = styled.button`
    padding: 10px;
    background-color: #D9D9D9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    text-align: center;

    &:active {
        background-color: #800020;
    }

    &:disabled {
        background-color: #D9D9D9;
        cursor: not-allowed;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;

    &::placeholder {
        font-size: 12px;
    }
`;

const PhoneNumberWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
    align-items: center;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const SmallText = styled.p`
    font-size: 12px;
    color: #999999;
    margin-top: -10px;
    margin-bottom: 10px;
`;

const NavigationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const NavigationButton = styled.button`
    padding: 10px 20px;
    background-color: #D9D9D9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;

    &:active {
        background-color: #800020;
    }
`;

const AuthButton = styled.button`
    height: 40px;
    background-color: #800020;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
    width: 80px;
    text-align: center;
    margin-bottom: 10px;
`;

const InputWithButton = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;

    input {
        border: none;
        flex: 1;
        padding: 10px;
        height: 100%;
    }

    button {
        height: 100%;
        background-color: #F4F4F5;
        color: #37383C;
        border: none;
        cursor: pointer;
        text-align: center;
        border-radius: 15px;
        padding: 0 10px;
        margin-right: 10px;
    }
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    input {
        margin-right: 10px;
    }
`;

const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #999999;
`;

const SignupPage = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        authCode: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        businessNumber: '',
        publisherName: '',
        representativeName: '',
        representativePhone: '',
        businessAddress: '',
        detailedAddress: '',
        website: ''
    });

    const [consent, setConsent] = useState({
        all: false,
        age: false,
        terms: false,
        privacy: false,
        promotional: false,
        email: false,
        appPush: false,
        sms: false,
    });

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (!selectedRole) {
            alert('회원 구분을 선택해주세요.');
        } else {
            setCurrentStep(1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (
                formData.email &&
                formData.name &&
                formData.phone &&
                formData.authCode &&
                formData.password &&
                formData.confirmPassword
            ) {
                setCurrentStep(currentStep + 1);
            } else {
                alert('모든 정보를 입력해주세요.');
            }
        } else if (currentStep === 2) {
            if (
                formData.businessName &&
                formData.businessNumber &&
                formData.publisherName &&
                formData.representativeName &&
                formData.representativePhone &&
                formData.businessAddress
            ) {
                setCurrentStep(currentStep + 1);
            } else {
                alert('모든 정보를 입력해주세요.');
            }
        } else if (currentStep === 3) {
            if (consent.age && consent.terms && consent.privacy) {
                alert('회원가입이 완료되었습니다!');
            } else {
                alert('필수 약관에 동의해주세요.');
            }
        }
    };

    const handleAuthCodeSend = () => {
        alert(`인증번호가 ${formData.phone}로 전송되었습니다.`);
    };

    const handleAddressSearch = () => {
        alert('주소 검색 기능은 구현되지 않았습니다.');
    };

    const handleConsentChange = (e) => {
        const { name, checked } = e.target;
        setConsent((prevConsent) => {
            if (name === 'all') {
                return {
                    all: checked,
                    age: checked,
                    terms: checked,
                    privacy: checked,
                    promotional: checked,
                    email: checked,
                    appPush: checked,
                    sms: checked,
                };
            } else {
                return {
                    ...prevConsent,
                    [name]: checked,
                    all: checked && prevConsent.age && prevConsent.terms && prevConsent.privacy,
                };
            }
        });
    };

    return (
        <SignupContainer>
            {currentStep === 0 ? (
                <FormWrapper>
                    <Title>회원가입</Title>
                    <Description>안녕하세요! 릿맵에 오신걸 환영합니다.</Description>
                    <Description>릿맵의 회원은</Description>
                    <Description><HighlightDescription>콘텐츠 공급자와 창작자만</HighlightDescription> 가입이 가능합니다.</Description>
                    <br />
                    <Description>회원가입을 진행하기를 원하시면</Description>
                    <Description>아래 회원 구분을 선택해주세요.</Description>

                    <ButtonWrapper>
                        <Button active={selectedRole === '대표'} onClick={() => handleRoleSelect('대표')}>대표</Button>
                        <Button active={selectedRole === '직원'} onClick={() => handleRoleSelect('직원')}>직원</Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button active={selectedRole === '1인작가'} onClick={() => handleRoleSelect('1인작가')}>1인작가</Button>
                        <Button active={selectedRole === '협력사'} onClick={() => handleRoleSelect('협력사')}>협력사</Button>
                    </ButtonWrapper>

                    <ContinueButton onClick={handleContinue}>계속 진행하기</ContinueButton>
                </FormWrapper>
            ) : currentStep === 1 ? (
                <FormWrapper>
                    <Title>회원가입</Title>
                    <Description>이메일과 휴대폰 번호를 입력해주세요.</Description>

                    <Description>이메일</Description>
                    <Input type="email" name="email" placeholder="이메일을 입력해주세요." value={formData.email} onChange={handleChange} />

                    <Description>이름</Description>
                    <Input type="text" name="name" placeholder="이름을 입력해주세요." value={formData.name} onChange={handleChange} />

                    <Description>휴대폰 번호</Description>
                    <Select name="countryCode" value="+82">
                        <option value="+82">South Korea +82</option>
                    </Select>
                    <PhoneNumberWrapper>
                        <Input
                            type="text"
                            name="phone"
                            placeholder="(예시) 01012345678"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ height: '40px' }}
                        />
                        <AuthButton onClick={handleAuthCodeSend}>전송</AuthButton>
                    </PhoneNumberWrapper>
                    <Input
                        type="text"
                        name="authCode"
                        placeholder="인증번호를 입력해주세요."
                        value={formData.authCode}
                        onChange={handleChange}
                    />

                    <Description>비밀번호</Description>
                    <Input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호를 다시 한번 입력해주세요."
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <SmallText>영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상</SmallText>
                    <SmallText>16자 이하로 입력해주세요.</SmallText>

                    <NavigationWrapper>
                        <NavigationButton onClick={handlePrevious}>이전</NavigationButton>
                        <NavigationButton onClick={handleNext}>다음</NavigationButton>
                    </NavigationWrapper>
                </FormWrapper>
            ) : currentStep === 2 ? (
                <FormWrapper>
                    <Title>회원가입</Title>
                    <Description>사업자 정보를 입력해주세요.</Description>

                    <Description>사업자명</Description>
                    <Description style={{ fontSize: '12px', color: '#999999' }}>사업자 번호 입력 후 사업자 인증을 진행해주세요.</Description>
                    <InputWithButton>
                        <Input type="text" name="businessNumber" placeholder="사업자 등록번호를 입력해주세요." value={formData.businessNumber} onChange={handleChange} />
                        <button>사업자 인증</button>
                    </InputWithButton>

                    <Description>출판사명(국문/영문)</Description>
                    <Input type="text" name="publisherName" placeholder="출판사명을 입력해주세요." value={formData.publisherName} onChange={handleChange} />

                    <Description>대표자명</Description>
                    <Input type="text" name="representativeName" placeholder="대표자명을 입력해주세요." value={formData.representativeName} onChange={handleChange} />

                    <Description>대표 전화번호</Description>
                    <Input type="text" name="representativePhone" placeholder="(예시) 01012345678" value={formData.representativePhone} onChange={handleChange} />

                    <Description>사업자 주소</Description>
                    <InputWithButton>
                        <Input type="text" name="businessAddress" placeholder="주소를 입력해주세요." value={formData.businessAddress} onChange={handleChange} />
                        <button onClick={handleAddressSearch}>주소 검색</button>
                    </InputWithButton>
                    <Input type="text" name="detailedAddress" placeholder="상세 주소를 입력해주세요." value={formData.detailedAddress} onChange={handleChange} />

                    <Description>홈페이지</Description>
                    <Input type="text" name="website" placeholder="(ex. http://www.mukhak.com)" value={formData.website} onChange={handleChange} />

                    <NavigationWrapper>
                        <NavigationButton onClick={handlePrevious}>이전</NavigationButton>
                        <NavigationButton onClick={handleNext}>다음</NavigationButton>
                    </NavigationWrapper>
                </FormWrapper>
            ) : (
                <FormWrapper>
                    <Title>약관 동의</Title>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="all"
                            checked={consent.all}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>전체 동의</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="age"
                            checked={consent.age}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>만 14세 이상입니다. (필수)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="terms"
                            checked={consent.terms}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>이용 약관 동의 (필수)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="privacy"
                            checked={consent.privacy}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>개인정보 수집 및 이용 동의 (필수)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="promotional"
                            checked={consent.promotional}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>개인정보 제3자 제공 동의 (선택)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="email"
                            checked={consent.email}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>광고성 정보 수신 동의 - 이메일 (선택)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="appPush"
                            checked={consent.appPush}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>광고성 정보 수신 동의 - 앱 푸시 (선택)</CheckboxLabel>
                    </CheckboxWrapper>
                    <CheckboxWrapper>
                        <input
                            type="checkbox"
                            name="sms"
                            checked={consent.sms}
                            onChange={handleConsentChange}
                        />
                        <CheckboxLabel>광고성 정보 수신 동의 - SMS (선택)</CheckboxLabel>
                    </CheckboxWrapper>
                    <NavigationWrapper>
                        <NavigationButton onClick={handlePrevious}>이전</NavigationButton>
                        <NavigationButton onClick={handleNext}>가입 완료</NavigationButton>
                    </NavigationWrapper>
                </FormWrapper>
            )}
        </SignupContainer>
    );
};

export default SignupPage;