import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const [email, setEmail] = useState("");
    const [workEmail, setWorkEmail] = useState(""); // 업무용 이메일 (1인작가)
    const [representativePhone, setRepresentativePhone] = useState(""); // 대표 전화번호 (출판사)
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [currentPassword, setCurrentPassword] = useState(""); // 비밀번호 확인 단계에서 사용
    const [newPassword, setNewPassword] = useState(""); // 비밀번호 변경 단계에서 사용
    const [confirmNewPassword, setConfirmNewPassword] = useState(""); // 비밀번호 확인 단계에서 사용
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isWorkEmailEditable, setIsWorkEmailEditable] = useState(false);
    const [isWebsiteEditable, setIsWebsiteEditable] = useState(false);
    const [isAddressEditable, setIsAddressEditable] = useState(false);
    const [memberType, setMemberType] = useState(""); 
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [myMessage, setMyMessage] = useState("");
    const [userImage, setUserImage] = useState("");
    const [urlLink, setUrlLink] = useState("");
    const [memberRoleStatus, setMemberRoleStatus] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false); // 비밀번호 확인 완료 여부

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                
                // 먼저 쿠키 또는 로컬 스토리지에서 memberRoleStatus를 가져옵니다.
                const memberRoleStatus = getCookie("memberRoleStatus");

                if (memberRoleStatus === "PUBLISHER_MEMBER") {
                    // PUBLISHER_MEMBER의 경우 출판사 전용 API 호출
                    response = await axios.get("https://api.litmap.store/api/publishers/mypage", {
                        withCredentials: true,
                    });

                } else {
                    // 그 외의 경우 일반 회원 API 호출
                    response = await axios.get("https://api.litmap.store/api/members/mypage", {
                        withCredentials: true,
                    });
                }

                if (response.data.resultCode === 200) {
                    const data = response.data.result;

                    console.log("Fetched user data:", data);

                    // 상태 업데이트
                    setEmail(data.litmapEmail);
                    setWorkEmail(data.workEmail || "");
                    setRepresentativePhone(data.publisherPhoneNumber || ""); // 대표 전화번호 설정
                    setWebsite(data.urlLink || "");
                    setAddress(data.publisherAddress || "");
                    setName(data.name);
                    setNickname(data.nickname);
                    setMyMessage(data.myMessage || "");
                    setUserImage(data.userImage || "/profile.png");
                    setUrlLink(data.urlLink || "");
                    setMemberRoleStatus(data.memberRoleStatus);

                    if (data.memberRoleStatus === "PUBLISHER_MEMBER") {
                        setMemberType("출판사 직원");
                    } else {
                        setMemberType("1인작가");
                    }
                } else {
                    throw new Error("Failed to fetch member data");
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setErrorMessage("사용자 정보를 불러오는데 실패했습니다.");
            }
        };

        fetchData();
    }, []);

    const getCookie = (name) => {
        const cookieArr = document.cookie.split("; ");
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0]) {
                return cookiePair[1];
            }
        }
        return null;
    };

    const handlePasswordVisibilityToggle = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleConfirmPasswordVisibilityToggle = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };
    
    const handleSave = async () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$/;
    
        // 비밀번호가 입력된 경우에만 유효성 검사
        if (newPassword && !passwordPattern.test(newPassword)) {
            setErrorMessage("비밀번호 조건에 맞지 않습니다.");
            return;
        }
    
        if (newPassword && newPassword !== confirmNewPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        // 기본적인 업데이트 데이터 객체 생성
        let updatedData = {};
    
        if (memberType === "1인작가") {
            updatedData = {
                workEmail: workEmail,
                name,
                nickname,
                myMessage,
                userImage,
                urlLink: website,
            };
        } else if (memberType === "출판사 직원") {
            updatedData = {
                publisherAddress: address,
                publisherPhoneNumber: representativePhone,
                name,
                memberRoleStatus, // 현재 상태의 memberRoleStatus를 유지
            };
        }
    
        // 비밀번호가 입력된 경우에만 필드를 추가
        if (newPassword) {
            updatedData.password = newPassword;
            updatedData.confirmPassword = confirmNewPassword;
        }
    
        console.log("Sending updated data:", updatedData);
    
        try {
            const apiUrl =
                memberType === "1인작가"
                    ? "https://api.litmap.store/api/members/update"
                    : "https://api.litmap.store/api/publishers/update";
    
            const response = await axios.put(apiUrl, updatedData, {
                withCredentials: true,
            });
    
            if (response.data.resultCode === 200 || response.data.resultCode === 204) {
                setSuccessMessage("정보가 성공적으로 저장되었습니다.");
                console.log("정보가 성공적으로 저장되었습니다.");
            } else {
                setErrorMessage("정보 수정에 실패했습니다.");
                console.error("Failed response data:", response.data);
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            setErrorMessage("정보 수정에 실패했습니다.");
        }
    };       
    
    const handleCancel = () => {
        // 필요한 경우 취소 시 초기화 로직 추가
    };

    const handleServiceWithdrawal = () => {
        navigate("/category2/edit-member/withdrawal"); // 탈퇴 페이지로 이동
    };

    const handleNext = async () => {
        try {
            console.log("Verifying password with data:", {
                password: currentPassword
            });
    
            const response = await axios.post('https://api.litmap.store/api/members/verify-password', {
                password: currentPassword   // 사용자가 입력한 비밀번호만 전송
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
    
            console.log("API response:", response.data);
    
            if (response.data.result && response.data.resultCode === 200) {
                setIsPasswordConfirmed(true);
                setErrorMessage("");
            } else {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error("비밀번호 확인 중 오류가 발생했습니다:", error);
            setErrorMessage("비밀번호 확인에 실패했습니다.");
        }
    };

    return (
        <Content>
            {!isPasswordConfirmed ? (
                <>
                    <Header>비밀번호 확인</Header>
                    <div className="description">안전한 개인정보를 위해 비밀번호를 입력해주세요.</div>
                    <InfoItem>
                        <div className="title">비밀번호</div>
                        <div className="input-container">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
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
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                {memberType === "1인작가" ? (
                    <>
                        <InfoItem>
                            <div className="title">작품 URL</div>
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
                            {isWorkEmailEditable ? (
                                <input
                                    type="text"
                                    value={workEmail}
                                    onChange={(e) => setWorkEmail(e.target.value)}
                                />
                            ) : (
                                <div>{workEmail}</div>
                            )}
                            <SmallButton onClick={() => setIsWorkEmailEditable(!isWorkEmailEditable)}>
                                {isWorkEmailEditable ? "완료" : "변경"}
                            </SmallButton>
                        </InfoItem>
                    </>
                ) : (
                    <>
                        <InfoItem>
                            <div className="title">대표 번호</div>
                            {isWorkEmailEditable ? (
                                <input
                                    type="text"
                                    value={representativePhone}
                                    onChange={(e) => setRepresentativePhone(e.target.value)}
                                />
                            ) : (
                                <div>{representativePhone}</div>
                            )}
                            <SmallButton onClick={() => setIsWorkEmailEditable(!isWorkEmailEditable)}>
                                {isWorkEmailEditable ? "완료" : "변경"}
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
                {successMessage && <div className="success">{successMessage}</div>}
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
