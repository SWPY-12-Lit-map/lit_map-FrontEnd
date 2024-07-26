import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Content = styled.div`
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
`;

const InfoItem = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    position: relative;
    flex-wrap: wrap;

    .title {
        font-weight: bold;
        margin-right: 10px;
        color: #343a40;
    }

    .description {
        color: #959595;
        font-size: 10px;
        margin-bottom: 10px;
    }

    .input-container {
        position: relative;
        width: 100%;
        max-width: 300px;
    }

    input {
        width: 100%;
        padding: 8px;
        padding-right: 30px;
        border: 1px solid #9F9F9F;
        border-radius: 10px;
        color: #9F9F9F;
        font-size: 13px;
        margin-top: 5px;
    }

    .error {
        color: red;
        font-size: 12px;
        position: absolute;
        bottom: -20px;
        left: 0;
    }

    .password-toggle {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: #9F9F9F;
    }
`;

const Divider = styled.hr`
    margin: 20px 0;
    border: 0;
    border-top: 1px solid #9F9F9F;
`;

const Button = styled.button`
    background-color: white;
    color: #8D2741;
    border: 1px solid #8D2741;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    width: 80px;
    align-self: flex-end;

    &:hover {
        background-color: #f8f9fa;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .left {
        flex-grow: 1;
        display: flex;
        justify-content: flex-start;
    }

    .right {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }
`;

const SmallButton = styled.button`
    background-color: white;
    color: #8D2741;
    border: 1px solid #8D2741;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 12px;
    margin-left: auto;

    &:hover {
        background-color: #f8f9fa;
    }
`;

const WithdrawalButton = styled.button`
    background-color: white;
    color: #959595;
    font-size: 14px;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-top: 30px;

    &:hover {
        text-decoration: underline;
    }
`;

const CloseButton = styled(Button)`
    width: 100px;
    background-color: white;
    border: 1px solid #7D7D7D;
    color: #7D7D7D;
    font-size: 15px;

    &:hover {
        text-decoration: underline;
    }
`;

const RestoreButton = styled(Button)`
    width: 100px;
    background-color: #E7C6CE;
    color: white;
    border: none;
    font-size: 15px;

    &:hover {
        background-color: #8B0024;
    }
`;

const SmallText = styled.p`
    font-size: 12px;
    color: #7D7D7D;
    margin-top: -10px;
    margin-bottom: 10px;
`;

const MemberEdit = () => {
    const [password, setPassword] = useState("");
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState("litmap0728@litmap.com");
    const [phone, setPhone] = useState("010-0000-0000");
    const [website, setWebsite] = useState("https://www.litmap.com");
    const [address, setAddress] = useState("서울시 강서구 마곡나루");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isPhoneEditable, setIsPhoneEditable] = useState(false);
    const [isWebsiteEditable, setIsWebsiteEditable] = useState(false);
    const [isAddressEditable, setIsAddressEditable] = useState(false);
    const [showWithdrawalPage, setShowWithdrawalPage] = useState(false);
    const [memberType, setMemberType] = useState("대표"); // 대표, 직원, 1인작가, 협력사

    useEffect(() => {
        // API 호출
    }, []);

    const handlePasswordVisibilityToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleConfirmPasswordVisibilityToggle = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleNext = () => {
        const isPasswordCorrect = password === "password123"; // 임시로 비밀번호 설정해둠
        if (isPasswordCorrect) {
            setEditing(true);
            setErrorMessage("");
        } else {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
        }
    };

    const handleSave = async () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$/;

        if (!passwordPattern.test(newPassword)) {
            setErrorMessage("조건에 맞지 않습니다.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const updatedData = {
            email,
            phone,
            website,
            address,
            newPassword
        };
        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("정보 수정에 실패했습니다.");
            }
            console.log("정보가 성공적으로 저장되었습니다.");
            setEditing(false);
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("정보 수정에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleServiceWithdrawal = () => {
        setShowWithdrawalPage(true); // 탈퇴 페이지를 표시
    };

    const handleCancelWithdrawal = () => {
        setShowWithdrawalPage(false); // 탈퇴 페이지를 숨김
    };

    const handleConfirmWithdrawal = async () => {
        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error("서비스 탈퇴에 실패했습니다.");
            }
            console.log("서비스가 성공적으로 탈퇴되었습니다.");
            // 서비스 탈퇴 후 로직 추가 -> 로그아웃된 홈페이지로 이동?
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("서비스 탈퇴에 실패했습니다.");
        }
    };

    return (
        <Content>
            {!editing ? (
                <>
                    <Header>비밀번호 확인</Header>
                    <div className="description">안전한 개인정보를 위해 비밀번호를 입력해주세요.</div>
                    <InfoItem>
                        <div className="title">비밀번호</div>
                        <div className="input-container">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력해주세요."
                            />
                            <div className="password-toggle" onClick={handlePasswordVisibilityToggle}>
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                    </InfoItem>
                    <Button onClick={handleNext}>다음</Button>
                </>
            ) : (
                <>
                    <Header>회원정보 및 수정</Header>
                    <InfoItem>
                        <div className="title">이메일</div>
                        <div>{email}</div>
                    </InfoItem>
                    <InfoItem>
                        <div className="title">새 비밀번호</div>
                        <div className="input-container">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="새 비밀번호를 입력해주세요."
                            />
                            <div className="password-toggle" onClick={handlePasswordVisibilityToggle}>
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </InfoItem>
                    <SmallText>영문 대소문자, 숫자를 조합하여 8자 이상 20자 이하로 입력해주세요.</SmallText>
                    <InfoItem>
                        <div className="title">새 비밀번호 확인</div>
                        <div className="input-container">
                            <input
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="새 비밀번호를 한번 더 입력해주세요."
                            />
                            <div className="password-toggle" onClick={handleConfirmPasswordVisibilityToggle}>
                                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </InfoItem>
                    <Divider />
                    <InfoItem>
                        <div className="title">이름</div>
                        <div>{name}</div>
                    </InfoItem>
                    <InfoItem>
                        <div className="title">회원 구분</div>
                        <div>{memberType}</div>
                    </InfoItem>
                    <Divider />
                    {memberType === "writer" ? (
                        <>
                            <InfoItem>
                                <div className="title">작품 링크</div>
                                {isWebsiteEditable ? (
                                    <input
                                        type="text"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                ) : (
                                    <div>{website}</div>
                                )}
                                <SmallButton onClick={() => setIsWebsiteEditable(!isWebsiteEditable)}>
                                    {isWebsiteEditable ? "완료" : "변경"}
                                </SmallButton>
                            </InfoItem>
                            <InfoItem>
                                <div className="title">업무용 이메일</div>
                                {isPhoneEditable ? (
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                ) : (
                                    <div>{phone}</div>
                                )}
                                <SmallButton onClick={() => setIsPhoneEditable(!isPhoneEditable)}>
                                    {isPhoneEditable ? "완료" : "변경"}
                                </SmallButton>
                            </InfoItem>
                        </>
                    ) : (
                        <>
                            <InfoItem>
                                <div className="title">대표 번호</div>
                                {isPhoneEditable ? (
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                ) : (
                                    <div>{phone}</div>
                                )}
                                <SmallButton onClick={() => setIsPhoneEditable(!isPhoneEditable)}>
                                    {isPhoneEditable ? "완료" : "변경"}
                                </SmallButton>
                            </InfoItem>
                            <InfoItem>
                                <div className="title">사업자 주소</div>
                                {isAddressEditable ? (
                                    <>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div>{address}</div>
                                    </>
                                )}
                                <SmallButton onClick={() => setIsAddressEditable(!isAddressEditable)}>
                                    {isAddressEditable ? "완료" : "변경"}
                                </SmallButton>
                            </InfoItem>
                        </>
                    )}
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <ButtonContainer>
                        <div className="left">
                            <WithdrawalButton onClick={handleServiceWithdrawal}>서비스 탈퇴하기</WithdrawalButton>
                        </div>
                        <div className="right">
                            <CloseButton onClick={handleCancel}>취소하기</CloseButton>
                            <RestoreButton onClick={handleSave}>저장하기</RestoreButton>
                        </div>
                    </ButtonContainer>
                </>
            )}
        </Content>
    );
};

export default MemberEdit;
